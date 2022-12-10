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
        public async Task<IEnumerable<LocationData>> AllFacilityTimelineData(FacilityAllTimelineParams timelineParams) {
            var facilities = 
                this._context.Facilities.Where(x=>! String.IsNullOrWhiteSpace(x.PiPath)).ToList();
            
            var facilityTimelineData = await this._piDataService.AllFacilityTimeSeriesData(facilities, timelineParams.StartDate, timelineParams.EndDate, timelineParams.Interval);
            return facilityTimelineData;
        }

        [HttpPost("FacilityTimelineData")]
        public async Task<IEnumerable<LocationData>> FacilityTimelineData(FacilityTimelineParams timelineParams) {
            var rooms = this._context.Rooms.Where(r=>r.FacilityId == timelineParams.FacilityId && r.Parameter == timelineParams.Attr).ToList();
            
            var facilityTimelineData = await this._piDataService.FacilityTimeSeriesData(rooms, timelineParams.StartDate, timelineParams.EndDate, timelineParams.Interval);
            return facilityTimelineData;

        }

    }
}

