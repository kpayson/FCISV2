using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.ViewModels;
using FCISUI.Data;
using AutoMapper;

public class FacilityRoomTimelineData
{
    public List<TimeSeriesPoint> Points { get; set; }
    public Room Room { get; set; }

    public string Tag { get; set; }
}

public class FacilityTimelineData
{
    public List<TimeSeriesPoint> Points { get; set; }
    public Facility Facility { get; set; }
    public string Tag { get; set; }
}

public class TimelineData<T>
{
    public List<TimeSeriesPoint> Points { get; set; }
    public T Facility { get; set; }
    public string Tag { get; set; }
}


namespace FCISUI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TimelineController : ControllerBase
    {
        private readonly FCISPortalContext _context;
        private readonly IMapper _mapper;

        private readonly IPIDataService _piDataService;

        private readonly string piPathEnv;

        public TimelineController(
            FCISPortalContext context,
            IPIDataService piDataService,
            IConfiguration config,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _piDataService = piDataService;

            var piServer = config.GetValue<string>("PIServer");
            var piDatabase = config.GetValue<string>("PIDatabase");
            var piDatabaseEnv = config.GetValue<string>("PIDatabaseEnv");
            piPathEnv = $@"\\{piServer}\{piDatabaseEnv}\{piDatabase}"; //ex \\ORFD-COGEN\Dev_cGMP\cGMP
        }


        [HttpPost("AllFacilityTimelineData")]
        public async Task<IEnumerable<FacilityTimelineData>> AllFacilityTimelineData(FacilityAllTimelineParams timelineParams)
        {
            var facilities =
                this._context.Facilities.Where(x => x.IsActive && x.FacilityIC.ToLower() == timelineParams.IC.ToLower())
                .ToList();

            var tags = facilities.Select(f=>$@"{piPathEnv}\{f.FacilitySection}|Facility_Status_Check").ToList();
            var batchData = await this._piDataService.TimeSeriesDataBatch(tags,timelineParams.StartDate.ToUniversalTime(),timelineParams.EndDate.ToUniversalTime(),timelineParams.Interval);


            var facilityData = batchData.Select(x=>{
                var parts = x.tag.Split('\\');
                var lastPart = parts.Last();
                var pipeIndex = lastPart.IndexOf('|');
                var facilitySection = lastPart.Substring(0,pipeIndex);
                return new FacilityTimelineData {
                    Points=x.data,
                    Facility=facilities.First(y=>y.FacilitySection == facilitySection),
                    Tag=x.tag
                };

            }).ToList();

            return facilityData;

        }

        [HttpPost("FacilityTimelineData")]
        public async Task<IEnumerable<FacilityRoomTimelineData>> FacilityTimelineData(FacilityTimelineParams timelineParams)
        {
            try
            {
                if (timelineParams.Attr.ToLower() == "dp")
                {
                    // \\ORF-COGENAF\cGMP\cGMP\2J\2N3074\2N2J1_2N3074_DP|DP|Maximum
                    // &start_time=2023-03-14T21:19:10&end_time=2023-03-15T21:19:10&rectype=interpolated&interval=10m
                    var connectedRooms =
                        this._context.Rooms.Where(r => r.FacilityId == timelineParams.FacilityId && r.IsActive && !String.IsNullOrEmpty(r.ConnectingRoom)).ToList();

                    if(! connectedRooms.Any()) {
                        return new List<FacilityRoomTimelineData>();
                    }
                    
                    var tags = (connectedRooms).Select(r=>{
                        var formattedName = r.FormattedName; //!String.IsNullOrWhiteSpace(r.FormattedName) ? r.FormattedName :  $"{r.ConnectingRoom}_{r.RoomNumber}_DP";
                        var piPath =  $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}\{formattedName}|DP|Status";
                        return piPath;
                    }).ToList();

                    var batchData = await this._piDataService.TimeSeriesDataBatch(tags,timelineParams.StartDate.ToUniversalTime(),timelineParams.EndDate.ToUniversalTime(),timelineParams.Interval);
                    
                    var facilityRoomData = batchData.Select(x=>{
                        var parts = x.tag.Split('\\');
                        var lastPart = parts.Last();
                        var pipeIndex = lastPart.IndexOf('|');
                        var roomPair = lastPart.Substring(0,pipeIndex);
                        var room = connectedRooms.First(y=>y.FormattedName==roomPair);
                        return new FacilityRoomTimelineData {
                            Points=x.data,
                            Room= new Room { RoomNumber = room.FormattedName, RoomName = room.RoomName },
                            Tag=x.tag
                        };

                    }).ToList();

                    return facilityRoomData;
                }

                else
                {
                    var attributeStatus = timelineParams.Attr == "Sum All" ? "Status" : $"{timelineParams.Attr}|Status";

                    var rooms =
                        this._context.Rooms.Where(r => r.FacilityId == timelineParams.FacilityId &&r.IsActive && String.IsNullOrEmpty(r.ConnectingRoom)).ToList();

                    if(! rooms.Any()) {
                        return new List<FacilityRoomTimelineData>();
                    }

                    var sw = System.Diagnostics.Stopwatch.StartNew();
                    var tags = rooms.Select(r=>$@"{piPathEnv}\{r.Facility}\{r.RoomNumber}|{attributeStatus}").ToList();
                    var batchData = await this._piDataService.TimeSeriesDataBatch(tags,timelineParams.StartDate.ToUniversalTime(),timelineParams.EndDate.ToUniversalTime(),timelineParams.Interval);
                    var facilityRoomData = batchData.Select(x=>{
                        var parts = x.tag.Split('\\');
                        var lastPart = parts.Last();
                        var pipeIndex = lastPart.IndexOf('|');
                        var roomNumber = lastPart.Substring(0,pipeIndex);
                        return new FacilityRoomTimelineData {
                            Points=x.data,
                            Room=rooms.First(y=>y.RoomNumber==roomNumber),
                            Tag=x.tag
                        };

                    }).ToList();

                    sw.Stop();

                    return facilityRoomData;
                    
                }

            }
            catch (Exception ex)
            {
                Console.Write(ex);
                throw ex;
            }
        }


        [HttpGet("AllFacilityCurrentData")]
        public async Task<IEnumerable<LocationCurrentStatus>> AllFacilityCurrentStatusData()
        {
            var facilities =
                this._context.Facilities.Where(x => x.IsActive && !String.IsNullOrWhiteSpace(x.FacilitySection)).ToList();
            
            var tags = facilities.Select(f =>
            {
                var tag = $@"{piPathEnv}\{f.FacilitySection}|Facility_Status_Check"; //ex \\ORF-COGENAF\cGMP\cGMP\PET_1|Facility_Status_Check
                return tag;
            }).ToList();

            var currentData = (await this._piDataService.CurrentStatusDataBatch(tags));
            var locationStatusValues = currentData.Select(x=>{
                var parts = x.Tag.Split('\\');
                var lastPart = parts.Last();
                var pipeIndex = lastPart.IndexOf('|');
                var facilitySection = lastPart.Substring(0,pipeIndex);
                var facility = facilities.First(x=>x.FacilitySection == facilitySection);
                return new LocationCurrentStatus {
                    Attribute="Composite",
                    LocationName=facility.CircleId!,
                    StatusPoint=new TimeSeriesPoint {numeric_value=x.numeric_value,Timestamp=0}
                };
            });
            return locationStatusValues;

        }

        [HttpGet("FacilityCurrentData/{facilityId}")]
        public async Task<IEnumerable<LocationCurrentStatus>> FacilityCurrentStatusData(int facilityId)
        {
            try {
                var singleRooms =
                    this._context.Rooms.Where(r => r.FacilityId == facilityId && r.IsActive && String.IsNullOrEmpty(r.ConnectingRoom)).ToList();

                var connectedRooms =
                    this._context.Rooms.Where(r => r.FacilityId == facilityId && r.IsActive && !String.IsNullOrEmpty(r.ConnectingRoom)).ToList();
                
                var roomTags = singleRooms.SelectMany(r=>{
                    var piPathRoom = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}";
                    return new List<string> {
                        $"{piPathRoom}|Status",
                        $"{piPathRoom}|Temp|Status",
                        $"{piPathRoom}|Airx|Status",
                        $"{piPathRoom}|Hum|Status"
                    };
                });

                var dpStatusTags = connectedRooms.Select(r => {
                    var piPath = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}\{r.FormattedName}|DP|Status";
                    return piPath;
                });

                var allTags = roomTags.Union(dpStatusTags).ToList();
                var currentData = (await this._piDataService.CurrentStatusDataBatch(allTags));

                var locationStatusValues = currentData.Select(x=>{
                    var parts = x.Tag.Split('\\');
                    var lastPart = parts.Last();
                    var pipeIndex = lastPart.IndexOf('|');
                    var locationName = lastPart.Substring(0,pipeIndex);
                    var pipeDelimParts = x.Tag.Split('|').ToList();
                    var attribute = pipeDelimParts[1] == "Status" ? "Composite" : pipeDelimParts[1];
  
                    return new LocationCurrentStatus {
                        Attribute=attribute,
                        LocationName=locationName,
                        StatusPoint=new TimeSeriesPoint {numeric_value=x.numeric_value,Timestamp=0}
                    };
                }).ToList();

                return locationStatusValues;

            }
            catch(Exception ex) {
                Console.Write(ex);
                throw ex;
            }
        }

        [HttpGet("APFLimits")]
        public async Task<IEnumerable<dynamic>> APFLimits()
        {
            var limits = await this._piDataService.APFLimits();
            return limits;
        }


    }
}

