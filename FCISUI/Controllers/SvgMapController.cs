using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using AutoMapper;
using System.Data.Entity;

namespace FCISUI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class SvgMapController : ControllerBase
    {
        private readonly FCISPortalContext _context;
        private readonly IMapper _mapper;


        public SvgMapController(
            FCISPortalContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpGet("{facilityId}")]
        public SvgMap GetSvgMap(string facilityId)
        {
            var name = "apf_facility_all"; // TODO
            var svgMap = this._context.SvgMaps.Include("SvgMapPins").First(x=>x.Name == name);
            var pins = this._context.SvgMapPins.Where(p=>p.SvgMapId == svgMap.Id).Select(p=>new SvgMapPin{
                LocationId = p.LocationId,
                Title = p.Title,
                Cx = p.Cx,
                Cy = p.Cy,
                R =  p.R,
                Path = p.Path
            }).ToList();
            svgMap.SvgMapPins = pins;
                
            return svgMap;
        }
    }
}