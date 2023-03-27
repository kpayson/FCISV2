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
                this._context.Facilities.Where(x => x.IsActive && x.FacilityIc.ToLower() == timelineParams.IC.ToLower())
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
            //             @app.post('/pi-api/time-series-batch')
            // async def time_series_batch(data: TimeSeriesBatch):        
            //     tags = data.tags
            //     start_time = data.start_time
            //     end_time = data.end_time
            //     rectype = data.rectype
            //     interval = data.interval

            //     df, msg = extract_taglist_data(tags, start_time, end_time, rectype, interval)

            //     return Response(df.to_json(orient="records"), media_type="application/json") 
            try
            {
                if (timelineParams.Attr.ToLower() == "dp")
                {
                    // \\ORF-COGENAF\cGMP\cGMP\2J\2N3074\2N2J1_2N3074_DP|DP|Maximum
                    // &start_time=2023-03-14T21:19:10&end_time=2023-03-15T21:19:10&rectype=interpolated&interval=10m
                    var connectedRooms =
                        this._context.ConnectingRooms.Where(r => r.FacilityId == timelineParams.FacilityId && r.IsActive).ToList();
                    var timelineData = await Task.WhenAll(connectedRooms.Select(async r =>
                    {
                        //var piPath = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}\{r.RoomNumber}_{r.ConnectedRoomNumber}_DP|DP|Status";
                        var piPath = !String.IsNullOrWhiteSpace(r.FormattedName) ?
                            $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}\{r.FormattedName}|DP|Status" :
                            $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}\{r.ConnectedRoomNumber}_{r.RoomNumber}_DP|DP|Status";

                        var points = (await this._piDataService.TimeSeriesData(
                                piPath,
                                timelineParams.StartDate.ToUniversalTime(),
                                timelineParams.EndDate.ToUniversalTime(),
                                timelineParams.Interval)).ToList();

                        return new FacilityRoomTimelineData { Points = points, Room = new Room { RoomNumber = $"{r.RoomNumber}_{r.ConnectedRoomNumber}" }, Tag = piPath };
                    })) ?? new FacilityRoomTimelineData[] { };
                    return timelineData;
                }

                else
                {
                    var attributeStatus = timelineParams.Attr == "Sum All" ? "Status" : $"{timelineParams.Attr}|Status";

                    var rooms =
                        this._context.Rooms.Where(r => r.FacilityId == timelineParams.FacilityId).ToList();

                    // var tags = rooms.Select(r=>$@"{piPathEnv}\{r.Facility}\{r.RoomNumber} |{attributeStatus}").ToList();
                    // var batchData = await this._piDataService.TimeSeriesDataBatch(tags,timelineParams.StartDate.ToUniversalTime(),timelineParams.EndDate.ToUniversalTime(),timelineParams.Interval);

                    var timelineData = await Task.WhenAll(rooms.Select(async r =>
                    {
                        var piPath = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber} |{attributeStatus}";
                        var points = (await this._piDataService.TimeSeriesData(
                                piPath,
                                timelineParams.StartDate.ToUniversalTime(),
                                timelineParams.EndDate.ToUniversalTime(),
                                timelineParams.Interval)).ToList();

                        return new FacilityRoomTimelineData { Points = points, Room = r, Tag = piPath };
                    })) ?? new FacilityRoomTimelineData[] { };

                    return timelineData;
                }

            }
            catch (Exception ex)
            {
                Console.Write(ex);
                throw ex;
            }
        }

        [HttpPost("FacilityTimelineDataDP")]
        public async Task<IEnumerable<FacilityRoomTimelineData>> FacilityTimelineDataDP(FacilityTimelineParams timelineParams)
        {
            // \\ORF-COGENAF\cGMP\cGMP\2J\2N3074\2N2J1_2N3074_DP|DP|Maximum
            // &start_time=2023-03-14T21:19:10&end_time=2023-03-15T21:19:10&rectype=interpolated&interval=10m
            var connectedRooms =
                this._context.ConnectingRooms.Where(r => r.FacilityId == timelineParams.FacilityId).ToList();
            var timelineData = await Task.WhenAll(connectedRooms.Select(async r =>
            {
                var piPath = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}\{r.ConnectedRoomNumber}";
                var points = (await this._piDataService.TimeSeriesData(
                        piPath,
                        timelineParams.StartDate.ToUniversalTime(),
                        timelineParams.EndDate.ToUniversalTime(),
                        timelineParams.Interval)).ToList();

                return new FacilityRoomTimelineData { Points = points, Room = new Room { RoomName = r.RoomName }, Tag = piPath };
            })) ?? new FacilityRoomTimelineData[] { };
            return timelineData;
        }


        [HttpGet("AllFacilityCurrentData")]
        public async Task<IEnumerable<LocationCurrentStatus>> AllFacilityCurrentStatusData()
        {
            var facilities =
                this._context.Facilities.Where(x => !String.IsNullOrWhiteSpace(x.FacilitySection)).ToList();
            var locationQueries = facilities.Select(f =>
            {
                var piPath = $@"{piPathEnv}\{f.FacilitySection}|Facility_Status_Check"; //ex \\ORF-COGENAF\cGMP\cGMP\PET_1|Facility_Status_Check
                return new LocationQuery { LocationName = f.Circleid!, Tag = piPath, Attribute = "Composite" };
            }).ToList();
            var currentData = await this._piDataService.CurrentStatusData(locationQueries);
            return currentData;
        }

        [HttpGet("FacilityCurrentData/{facilityId}")]
        public async Task<IEnumerable<LocationCurrentStatus>> FacilityCurrentStatusData(int facilityId)
        {
            var rooms =
                this._context.Rooms.Where(r => r.FacilityId == facilityId).ToList();

            var connectedRooms =
                this._context.ConnectingRooms.Where(r => r.FacilityId == facilityId).ToList();

            var roomStatusQueries = rooms.SelectMany(r =>
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
                var piPath = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber}\{r.ConnectedRoomNumber}_{r.RoomNumber}_DP|DP|Status";
                return new LocationQuery { LocationName = $"{r.ConnectedRoomNumber}_{r.RoomNumber}", Tag = piPath, Attribute = "DP" };
            }).ToList();

            var allQueries = roomStatusQueries.Union(dpStatusQueries).ToList();
            var currentData = await this._piDataService.CurrentStatusData(allQueries);
            return currentData;
        }

        // https://orfd-cogen.ors.nih.gov/pi-api/current-value?tag=\\ORFD-COGEN\Dev_cGMP\cGMP\2J\2N2J1|Status
        // https://orfd-cogen.ors.nih.gov/pi-api/current-value?tag=\\ORF-COGEN\cGMP\Dev_cGMP\2J\2N3074\2N2J1_2N3074_DP|Temp|Status
        // https://orfd-cogen.ors.nih.gov/pi-api/current-value?tag=\\ORF-COGEN\Dev_cGMP\cGMP\2J\2N3074|Status
        // https://orfd-cogen.ors.nih.gov/pi-api/current-value?tag=\\ORFD-COGEN\Dev_cGMP\cGMP\2J\2N2J1\2N2J1_2N3074_DP|DP|Status


        [HttpGet("APFLimits")]
        public async Task<IEnumerable<dynamic>> APFLimits()
        {
            var limits = await this._piDataService.APFLimits();
            return limits;
        }


    }
}

