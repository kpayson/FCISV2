using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.ViewModels;
using FCISUI.Logic;
using AutoMapper;

namespace FCISUI.Controllers
{     
    public class TimelineParams {
        public DateTime StartDate {get; set;}
        public DateTime EndDate {get; set;}
        public int FacId {get; set;}
        public string Atr {get; set;}
        public int Interval {get; set;}
    }

    public class PiData {
        public string RoomName {get; set;}
        public string RoomNumber {get; set;}
        public string SQ {get; set;}
        public string ISO {get; set;}
        public string ChillerStatus {get; set;}
        public string Color {get; set;}
        public string Tag {get; set;}
        public long StartTime {get; set;}
        public long EndTime {get; set;}
    }

    [Route("api/[controller]")]
    [ApiController]
    public class ApfTimelineController : ControllerBase
    {
        private readonly FCISPortalContext _context;
        private readonly IMapper _mapper;

        public ApfTimelineController(
            FCISPortalContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpPost]
        public async Task<ActionResult<IEnumerable<PiData>>> GetTimelineData(TimelineParams timelineParams)
        {
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
            return new List<PiData>();
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