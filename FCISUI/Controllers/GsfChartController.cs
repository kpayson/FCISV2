using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.ViewModels;
using AutoMapper;

namespace FCISUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GsfChartController : ControllerBase
    {
        private readonly FCISPortalContext _context;
        private readonly IMapper _mapper;

        public GsfChartController(
            FCISPortalContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetGsfData()
        {
            return new List<string>() { "RedTriange", "BlueSquare" };
        }

        [HttpGet("GsfByFacility")]
        public IEnumerable<FacilityGsf> GetGsfByFacility()
        {
            var rooms = _context.Rooms;
            var result = (rooms)
                .GroupBy(x => x.Facility)
                .Select(g => new FacilityGsf
                {
                    Facility = g.Key ?? "",
                    Gsf = g.Sum(x => x.Sq.GetValueOrDefault())
                });
            var resList = result.ToList();
            return resList;
        }

        [HttpGet("GsfByIC")]
        public IEnumerable<ICGsf> GetGsfByIC()
        {
            var rooms = _context.Rooms;
            var facilities = _context.Facilities;

            var result =
                (
                    from room in rooms
                    join facility in facilities on room.FacilityId equals facility.FacilityId
                    where facility.FacilityIc != null
                    select new ICGsf{ IC = facility.FacilityIc ?? "", Gsf = room.Sq.GetValueOrDefault() }
                ).GroupBy(g => g.IC).Select(g => new ICGsf
                {
                    IC = g.Key,
                    Gsf = g.Sum(g => g.Gsf)
                });
            var resList = result.ToList();
            return resList;
        }

        [HttpGet("GsfGrowthByClassification")]
        public List<GSFGrowthCumulative> GetGsfGrowthByClassification()
        {
            var gsfGrowthDeltas = _context.Gsfgrowths.Select(_mapper.Map<GSFGrowthDelta>).ToList();
            //var gsfGrowthCummulative = GSFGrowthUtil.GetCumulativeValues(gsfGrowthDeltas);
            return new List<GSFGrowthCumulative>();


            // DataModule _dm = new DataModule();
            // DataSet ds;
            // ds = _dm.GetDataSet("selectGSFGrowth");
            // var gsfGrowthDeltas = new List<GSFGrowthDelta>();
            // var rows = ds.Tables[0].Rows;
            // for (var i = 0; i < rows.Count; i++)
            // {
            //     var r = rows[i];
            //     gsfGrowthDeltas.Add(new GSFGrowthDelta
            //     {
            //         CncRoomsArea = (int)r["CncRoomsArea"],
            //         CncRoomsCount = (int)r["CncRoomsCount"],
            //         CriticalEnvironmentPrametersCount = (int)r["CriticalEnvironmentPrametersCount"],
            //         Iso7RoomsArea = (int)r["Iso7RoomsArea"],
            //         Iso7RoomsCount = (int)r["Iso7RoomsCount"],
            //         Iso8RoomsArea = (int)r["Iso8RoomsArea"],
            //         Iso8RoomsCount = (int)r["Iso8RoomsCount"],
            //         Month = (int)r["Month"],
            //         Year = (int)r["Year"]

            //     });
            // }
            // var gsfGrowthCummulative = GSFGrowthUtil.GetCumulativeValues(gsfGrowthDeltas);
            // return gsfGrowthCummulative;

        }
    }
}
