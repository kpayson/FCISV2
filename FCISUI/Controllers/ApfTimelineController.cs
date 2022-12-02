using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.ViewModels;
using FCISUI.Logic;
using FCISUI.Data;
using AutoMapper;
using OSIsoft.AF;
using OSIsoft.AF.Time;
using OSIsoft.AF.Asset;
using static System.Net.WebRequestMethods;


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


        [HttpPost]
        public async Task<ActionResult<IEnumerable<PIChartData>>> GetTimelineData(TimelineParams timelineParams)
        {
            //var timeSeriesData =
            //    tag=\\ORFD-COGEN\Dev_cGMP\cGMP\2J\2N2J1|Status&
            //    start_time=2022-11-26&
            //    end_time=2022-11-27&
            //    rectype=interpolated&
            //    interval=10m.

            var timeSeriesData = await this._piDataService.GetTimeSeriesData(
    "\\\\ORFD-COGEN\\Dev_cGMP\\cGMP\\2J\\2N2J1|Status", "2022-11-26", "2022-11-27", "10m");
                //this._piDataService.GetTimeSeriesData(
                //    "",timelineParams.StartDate, timelineParams.EndDate,timelineParams.Interval)

            
                var piChartData = this._piDataService.CreateDataListFacility(
                timelineParams.StartDate, 
                timelineParams.EndDate, 
                timelineParams.Interval,
                timelineParams.FacId, 
                timelineParams.Atr);

            return piChartData;

            // var dataList = (timelineParams.Atr == "DP") ?
            //     CreateDataListWindowB_DP(end1, start1, intervalAF, facid, Atr);
            if (timelineParams.Atr == "DP")
            {
                // dataList = CreateDataListWindowB_DP(end1, start1, intervalAF, facid, Atr);
                
            }
            else if (timelineParams.Atr == "Sum All")
            {
                //dataList = CreateDataListWindowB_SumAll_PIDirect(end1, start1, intervalAF, facid, Atr);
            }
            else
            {
                //dataList = CreateDataListWindowB_PIDirect(end1, start1, intervalAF, facid, Atr);
            }

        }

    }
}


// public static List<PIChartData> GetDataToPopulateWindowB(DateTime StrStartDate, DateTime StrEndDate, int facid, string Atr, int interval)
// {
//     string strSt = StrStartDate.ToString("yyyy-MM-ddTHH:mm");
//     string strEnd = StrEndDate.ToString("yyyy-MM-ddTHH:mm");

//     AFTime start1 = new AFTime(strSt);
//     AFTime end1 = new AFTime(strEnd);
//     AFTimeRange timeRange1 = new AFTimeRange(start1, end1);

//     AFTimeSpan intervalAF = new AFTimeSpan(minutes: interval);//changed to variable
//     List<PIChartData> dataList = new List<PIChartData>();

//     if (facid == 0) // Old version. works only for Portfolio All
//     {
//         dataList = CreateDataList(end1, start1, intervalAF, facid, Atr);
//     }
//     else // All other facilities
//     {
//         if (Atr.Equals("DP"))
//         {
//             dataList = CreateDataListWindowB_DP(end1, start1, intervalAF, facid, Atr);
//         }
//         else if (Atr.Equals("Sum All"))
//         {
//             dataList = CreateDataListWindowB_SumAll_PIDirect(end1, start1, intervalAF, facid, Atr);
//         }
//         else
//         {
//             dataList = CreateDataListWindowB_PIDirect(end1, start1, intervalAF, facid, Atr);
//         }
//     }
//     Debug.WriteLine($" Window B dataList size: {dataList.Count()}");
//     return dataList;
// }