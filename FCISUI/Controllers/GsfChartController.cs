using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.ViewModels;
using FCISUI.Logic;
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


        [HttpGet("GsfByFacility/{portfolioId}")]
        public IEnumerable<FacilityGsf> GetGsfByFacility(string portfolioId)
        {
            var portfolioFacilites =
                portfolioId == "APF" ?
                    new int [] {1,2,3,4,5,6,7,9,10,11,12,13,17,19} : 
                portfolioId == "CC" ?
                    new int [] {3,4,5,17,9,6,7,1,2} : 
                portfolioId == "CCE" ?
                    new int [] {3,4,5} :
                portfolioId == "CCPharmacy" ?
                    new int [] {17,19} :
                portfolioId == "CCOther" ?
                    new int [] {6,7,1,2} : 
                portfolioId == "NCI" ?
                    new int [] {10,11,12,13,19} :
                new int [] {};

            var rooms = _context.Rooms.Where(r => portfolioFacilites.Contains(r.FacilityId));
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
                    where facility.FacilityIC != null
                    select new ICGsf{ IC = facility.FacilityIC ?? "", Gsf = room.Sq.GetValueOrDefault() }
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
            var gsfGrowthCummulative = GSFGrowthUtil.GetCumulativeValues(gsfGrowthDeltas);
            return gsfGrowthCummulative;
        }
    }
}
