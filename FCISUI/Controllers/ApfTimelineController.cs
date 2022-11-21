using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.ViewModels;
using FCISUI.Logic;
using AutoMapper;

namespace FCISUI.Controllers
{     
    public interface ITimelineParams {
        DateTime StartDate {get; set;}
        DateTime EndDate {get; set;}
        int FacId {get; set;}
        string Atr {get; set;}
        int Interval {get; set;}
    }

    public interface IPiData {
        string RoomName {get; set;}
        string RoomNumber {get; set;}
        string SQ {get; set;}
        string ISO {get; set;}
        string ChillerStatus {get; set;}
        string Color {get; set;}
        string Tag {get; set;}
        long StartTime {get; set;}
        long EndTime {get; set;}
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
        public async Task<ActionResult<IEnumerable<IPiData>>> GetTimelineData(ITimelineParams timelineParams)
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
            return new List<IPiData>();
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