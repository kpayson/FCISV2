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

        public TimelineController(
            FCISPortalContext context,
            IPIDataService piDataService,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _piDataService = piDataService;
        }


        [HttpPost("AllFacilityTimelineData")]
        public async Task<IEnumerable<LocationTimeSeriesData>> AllFacilityTimelineData(FacilityAllTimelineParams timelineParams) {
            var facilities = 
                this._context.Facilities.Where(x=>! String.IsNullOrWhiteSpace(x.PiPath)).ToList();
            var locationQueries = facilities.Select(f=> new LocationQuery {LocationName=f.FacilityName, Tag=f.PiPath!}).ToList();
            var timelineData = await this._piDataService.LocationTimeSeriesData(locationQueries,timelineParams.StartDate.ToUniversalTime(), timelineParams.EndDate.ToUniversalTime(), timelineParams.Interval);
            return timelineData;
        }

        [HttpPost("FacilityTimelineData")]
        public async Task<IEnumerable<LocationTimeSeriesData>> FacilityTimelineData(FacilityTimelineParams timelineParams) {
            var rooms = 
                this._context.Rooms.Where(r=>r.FacilityId == timelineParams.FacilityId && r.Parameter == timelineParams.Attr).ToList();
            var locationQueries = rooms.Select(r=> new LocationQuery {LocationName=r.RoomNumber!, Tag=r.PiPath!}).ToList();
            var timelineData = await this._piDataService.LocationTimeSeriesData(locationQueries,timelineParams.StartDate.ToUniversalTime(), timelineParams.EndDate.ToUniversalTime(), timelineParams.Interval);
            return timelineData;
        }

        [HttpGet("AllFacilityCurrentData")]
        public async Task<IEnumerable<LocationCurrentStatus>> AllFacilityCurrentStatusData() {
            var facilities = 
                this._context.Facilities.Where(x=>! String.IsNullOrWhiteSpace(x.PiPath)).ToList();
            var locationQueries = facilities.Select(f => new LocationQuery {LocationName=f.Circleid!, Tag=f.PiPath!}).ToList();
            var currentData = await this._piDataService.CurrentStatusData(locationQueries);
            return currentData;
        }

        [HttpGet("FacilityCurrentData/{facilityId}")]
        public async Task<IEnumerable<LocationCurrentStatus>> FacilityCurrentStatusData(int facilityId) {
            var rooms = 
                this._context.Rooms.Where(r=>r.FacilityId == facilityId && r.Parameter == "Temp" && r.Sq != null).ToList();
            var locationQueries = rooms.Select(r => new LocationQuery {LocationName=r.RoomNumber!, Tag=r.PiPath!}).ToList();
            var currentData = await this._piDataService.CurrentStatusData(locationQueries);
            return currentData;
        }

        // https://orfd-cogen.ors.nih.gov/pi-api/current-value?tag=\\ORFD-COGEN\Dev_cGMP\cGMP\2J\2N2J1|Status

    }
}

