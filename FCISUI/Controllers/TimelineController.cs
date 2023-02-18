using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.ViewModels;
using FCISUI.Data;
using AutoMapper;

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
        public async Task<IEnumerable<LocationTimeSeriesData>> AllFacilityTimelineData(FacilityAllTimelineParams timelineParams)
        {
            //TODO what am i trying to do here ?? Is there a timeline for facilities
            var facilities =
                this._context.Facilities.Where(x => !String.IsNullOrWhiteSpace(x.PiPath)).ToList();
            var locationQueries = facilities.Select(f =>
            {
                return new LocationQuery { LocationName = f.FacilityName, Tag = f.PiPath! };
            }).ToList();
       
            var timelineData = await this._piDataService.LocationTimeSeriesData(locationQueries, timelineParams.StartDate.ToUniversalTime(), timelineParams.EndDate.ToUniversalTime(), timelineParams.Interval);
            return timelineData;
        }

        [HttpPost("FacilityTimelineData")]
        public async Task<IEnumerable<LocationTimeSeriesData>> FacilityTimelineData(FacilityTimelineParams timelineParams)
        {
            var attributeStatus = timelineParams.Attr == "Sum All" ? "Status" : $"{timelineParams.Attr}|Status";

            var rooms =
                this._context.Rooms.Where(r => r.FacilityId == timelineParams.FacilityId).ToList();
            var locationQueries = rooms.Select(r => {
                var piPath = $@"{piPathEnv}\{r.Facility}\{r.RoomNumber} |{attributeStatus}";
                return new LocationQuery { LocationName = r.RoomNumber!, Tag = piPath };
            }).ToList();
            var timelineData = await this._piDataService.LocationTimeSeriesData(locationQueries, timelineParams.StartDate.ToUniversalTime(), timelineParams.EndDate.ToUniversalTime(), timelineParams.Interval);
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

