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

            var timelineData = await Task.WhenAll(facilities.Select(async f =>
            {
                var pp = $@"{piPathEnv}\{f.FacilitySection}|Facility_Status_Check";
                var piPath = f.PiPath!; // ex \\ORF-COGENAF\cGMP\cGMP\PET_1|Facility_Status_Check
                var points = (await this._piDataService.TimeSeriesData(
                        piPath,
                        timelineParams.StartDate.ToUniversalTime(),
                        timelineParams.EndDate.ToUniversalTime(),
                        timelineParams.Interval)).ToList();
                return new FacilityTimelineData { Points = points, Facility = f, Tag = piPath };
            })) ?? new FacilityTimelineData[] { };

            return timelineData;
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
                    var timelineData = await Task.WhenAll(connectedRooms.Select(async r =>
                    {
                        var formattedName = !String.IsNullOrWhiteSpace(r.FormattedName) ? r.FormattedName :  $"{r.ConnectingRoom}_{r.RoomNumber}_DP";
                        var piPath =  $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}\{formattedName}|DP|Status";

                        var points = (await this._piDataService.TimeSeriesData(
                                piPath,
                                timelineParams.StartDate.ToUniversalTime(),
                                timelineParams.EndDate.ToUniversalTime(),
                                timelineParams.Interval)).ToList();

                        return new FacilityRoomTimelineData { Points = points, Room = new Room { RoomNumber = formattedName, RoomName = r.RoomName }, Tag = piPath };
                    })) ?? new FacilityRoomTimelineData[] { };
                    return timelineData;
                }

                else
                {
                    var attributeStatus = timelineParams.Attr == "Sum All" ? "Status" : $"{timelineParams.Attr}|Status";

                    var rooms =
                        this._context.Rooms.Where(r => r.FacilityId == timelineParams.FacilityId &&r.IsActive && String.IsNullOrEmpty(r.ConnectingRoom)).ToList();

                    var sw = System.Diagnostics.Stopwatch.StartNew();
//                     var tags = rooms.Select(r=>$@"{piPathEnv}\{r.Facility}\{r.RoomNumber}|{attributeStatus}").ToList();
//                     var batchData = await this._piDataService.TimeSeriesDataBatch(tags,timelineParams.StartDate.ToUniversalTime(),timelineParams.EndDate.ToUniversalTime(),timelineParams.Interval);
// sw.Stop();
//                     //var sw = System.Diagnostics.Stopwatch.StartNew();

//                     Console.Write(sw.ElapsedMilliseconds);
//                     sw.Reset();
                    sw.Start();
                    var timelineData = await Task.WhenAll(rooms.Select(async r =>
                    {
                        var piPath = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}|{attributeStatus}";
                        var points = (await this._piDataService.TimeSeriesData(
                                piPath,
                                timelineParams.StartDate.ToUniversalTime(),
                                timelineParams.EndDate.ToUniversalTime(),
                                timelineParams.Interval)).ToList();

                        return new FacilityRoomTimelineData { Points = points, Room = r, Tag = piPath };
                    })) ?? new FacilityRoomTimelineData[] { };

                    sw.Stop();
                    Console.Write(sw.ElapsedMilliseconds);
                    return timelineData;
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
                this._context.Facilities.Where(x => !String.IsNullOrWhiteSpace(x.FacilitySection)).ToList();
            var locationQueries = facilities.Select(f =>
            {
                var piPath = $@"{piPathEnv}\{f.FacilitySection}|Facility_Status_Check"; //ex \\ORF-COGENAF\cGMP\cGMP\PET_1|Facility_Status_Check
                return new LocationQuery { LocationName = f.CircleId!, Tag = piPath, Attribute = "Composite" };
            }).ToList();
            var currentData = await this._piDataService.CurrentStatusData(locationQueries);
            return currentData;
        }

        [HttpGet("FacilityCurrentData/{facilityId}")]
        public async Task<IEnumerable<LocationCurrentStatus>> FacilityCurrentStatusData(int facilityId)
        {
            var singleRooms =
                this._context.Rooms.Where(r => r.FacilityId == facilityId && String.IsNullOrEmpty(r.ConnectingRoom)).ToList();

            var connectedRooms =
                this._context.Rooms.Where(r => r.FacilityId == facilityId && !String.IsNullOrEmpty(r.ConnectingRoom)).ToList();

            var roomStatusQueries = singleRooms.SelectMany(r =>
            {
                var piPathRoom = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}";
                return new List<LocationQuery>() {
                    new LocationQuery { LocationName = r.RoomNumber!, Tag = $"{piPathRoom}|Status", Attribute="Composite" },
                    new LocationQuery { LocationName = r.RoomNumber!, Tag = $"{piPathRoom}|Temp|Status", Attribute="Temp" },
                    new LocationQuery { LocationName = r.RoomNumber!, Tag = $"{piPathRoom}|Airx|Status", Attribute="Airx" },
                    new LocationQuery { LocationName = r.RoomNumber!, Tag = $"{piPathRoom}|Hum|Status", Attribute="Hum" },
                    new LocationQuery { LocationName = r.RoomNumber!, Tag = $"{piPathRoom}|DP|Status", Attribute="DP" },
                };
            }).ToList();

            var dpStatusQueries = connectedRooms.Select(r =>
            {
                var formattedName = !String.IsNullOrWhiteSpace(r.FormattedName) ? r.FormattedName :  $"{r.ConnectingRoom}_{r.RoomNumber}_DP";
                var piPath = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}\{formattedName}|DP|Status";
                return new LocationQuery { LocationName = $"{r.FormattedName}", Tag = piPath, Attribute = "DP" };
            }).ToList();

            var allQueries = roomStatusQueries.Union(dpStatusQueries).ToList();
            var currentData = await this._piDataService.CurrentStatusData(allQueries);
            return currentData;
        }

        [HttpGet("APFLimits")]
        public async Task<IEnumerable<dynamic>> APFLimits()
        {
            var limits = await this._piDataService.APFLimits();
            return limits;
        }


    }
}

