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
            var gsfGrowthCummulative = GSFGrowthUtil.GetCumulativeValues(gsfGrowthDeltas);
            return gsfGrowthCummulative;
        }
    }
}
