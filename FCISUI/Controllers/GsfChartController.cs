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
                })
                .OrderBy(x=>
                    // CCE
                    x.Facility == "2J" ? 101 :
                    x.Facility == "E_TER" ? 102 :

                    // CC Phamrmacy
                    x.Facility == "IIVAU" ? 201 :

                    // CC Other
                    x.Facility == "Pet_1" ? 301 :
                    x.Facility == "Pet_B3" ? 302 :
                    x.Facility == "DLM_SL" ? 303 :

                    // NCI
                    x.Facility == "T30" ? 401 : 
                    x.Facility == "Tr1" ? 402 : 
                    x.Facility == "Tr2" ? 403 : 
                    x.Facility == "VVF" ? 404 : 
                    x.Facility == "HPP" ? 405 :
                    
                    // NIAID
                    x.Facility == "RP" ? 501 :

                    //Unknown
                    600
                )
                ;
            var resList = result.ToList();
            return resList;
        }

//         2J
// DLM_SL
// E_TER
// HPP
// IIVAU
// Pet_1
// Pet_B3
// RP
// T30
// Tr1
// Tr2
// VVF

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
                })
                .OrderBy(x=> 
                    x.IC == "CCE" ? 1 :
                    x.IC == "CC Pharmacy" ? 2 :
                    x.IC == "CC Other" ? 3 :
                    x.IC == "NCI" ? 4 :
                    x.IC == "NIAID" ? 5 :
                    100
                );
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
