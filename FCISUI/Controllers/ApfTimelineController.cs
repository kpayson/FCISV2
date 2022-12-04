using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.ViewModels;
using FCISUI.Data;
using AutoMapper;

namespace FCISUI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ApfTimelineController : ControllerBase
    {
        private readonly FCISPortalContext _context;
        private readonly IMapper _mapper;

        private readonly IPIDataService _piDataService;

        public ApfTimelineController(
            FCISPortalContext context,
            IPIDataService piDataService,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _piDataService = piDataService;
        }

    //         public class TimelineParams
    // {
    //     public DateTime StartDate { get; set; }
    //     public DateTime EndDate { get; set; }
    //     public int FacId { get; set; }
    //     public string Atr { get; set; }
    //     public int Interval { get; set; }
    // }


        [HttpPost]
        public async Task<IEnumerable<TimeSeriesPoint>> GetTimelineData(TimelineParams timelineParams)
        {
            //var timeSeriesData =
            //    tag=\\ORFD-COGEN\Dev_cGMP\cGMP\2J\2N2J1|Status&
            //    start_time=2022-11-26&
            //    end_time=2022-11-27&
            //    rectype=interpolated&
            //    interval=10m.

            var timeSeriesData = await this._piDataService.GetTimeSeriesData(
    "\\\\ORFD-COGEN\\Dev_cGMP\\cGMP\\2J\\2N2J1|Status", "2022-11-26", "2022-11-27", "10m") ;


            return timeSeriesData; 


        }

    }
}

