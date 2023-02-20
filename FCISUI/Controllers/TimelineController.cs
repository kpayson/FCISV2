using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.ViewModels;
using FCISUI.Data;
using AutoMapper;

public class FacilityRoomTimelineData {
    public List<TimeSeriesPoint> Points {get; set;}
    public Room Room {get; set;}

    public string Tag {get; set;}
}

public class FacilityTimelineData {
    public List<TimeSeriesPoint> Points {get; set;}
    public Facility Facility {get; set;}
    public string Tag {get; set;}
}

public class TimelineData<T> {
    public List<TimeSeriesPoint> Points {get; set;}
    public T Facility {get; set;}
    public string Tag {get; set;}
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
                this._context.Facilities.Where(x => !String.IsNullOrWhiteSpace(x.PiPath)).ToList();

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
            })) ?? new FacilityTimelineData[] {};

            return timelineData;
        }

        [HttpPost("FacilityTimelineData")]
        public async Task<IEnumerable<FacilityRoomTimelineData>> FacilityTimelineData(FacilityTimelineParams timelineParams)
        {
            var attributeStatus = timelineParams.Attr == "Sum All" ? "Status" : $"{timelineParams.Attr}|Status";

            var rooms =
                this._context.Rooms.Where(r => r.FacilityId == timelineParams.FacilityId).ToList();

            var timelineData = await Task.WhenAll(rooms.Select(async r =>
            {
                var piPath = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber} |{attributeStatus}";
                var points = (await this._piDataService.TimeSeriesData(
                        piPath,
                        timelineParams.StartDate.ToUniversalTime(),
                        timelineParams.EndDate.ToUniversalTime(),
                        timelineParams.Interval)).ToList();

                return new FacilityRoomTimelineData { Points = points, Room = r, Tag = piPath };
            })) ?? new FacilityRoomTimelineData[] {};

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
                return new LocationQuery { LocationName = f.Circleid!, Tag = piPath };
            }).ToList();
            var currentData = await this._piDataService.CurrentStatusData(locationQueries);
            return currentData;
        }

        [HttpGet("FacilityCurrentData/{facilityId}")]
        public async Task<IEnumerable<LocationCurrentStatus>> FacilityCurrentStatusData(int facilityId)
        {
            var rooms =
                this._context.Rooms.Where(r => r.FacilityId == facilityId).ToList();
            var locationQueries = rooms.Select(r =>
            {
                var piPath = $@"{piPathEnv}\{r.Facility}|Facility_Status_Check";
                return new LocationQuery { LocationName = r.RoomNumber!, Tag = piPath };
            }).ToList();
            var currentData = await this._piDataService.CurrentStatusData(locationQueries);
            return currentData;
        }

        // https://orfd-cogen.ors.nih.gov/pi-api/current-value?tag=\\ORFD-COGEN\Dev_cGMP\cGMP\2J\2N2J1|Status

    }
}

