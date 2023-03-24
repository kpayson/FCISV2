using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.Data;
using AutoMapper;
using System.Net;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace FCISUI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class SvgMapController : ControllerBase
    {
        private readonly FCISPortalContext _context;
        private readonly IMapper _mapper;
        private readonly IPIDataService _piDataService;


        public SvgMapController(
            FCISPortalContext context,
            IPIDataService piDataService,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _piDataService = piDataService;

        }

        [HttpGet("{facilityId}")]
        public ActionResult<SvgMap> GetSvgMap(int facilityId)
        {
            try {

                var svgMap = this._context.SvgMaps.FirstOrDefault(x=>x.FacilityId == facilityId);
                if(svgMap == null) {
                    throw new Exception("error unable to get svgMap");
                }
                var pins = this._context.SvgMapPins.Where(p=>p.SvgMapId == svgMap.Id).Select(p=>new SvgMapPin{
                    LocationId = p.LocationId,
                    Title = p.Title,
                    Cx = p.Cx,
                    Cy = p.Cy,
                    R =  p.R,
                    Path = p.Path
                }).ToList();
                svgMap.BackgroundImage = new Byte[]{};
                svgMap.SvgMapPins = pins;
                
                var path = this.Request.Path;
                return svgMap;
            }
            catch(Exception ex) {
                return StatusCode(500);
            }
        }


        [HttpGet("BackgroundImage/{facilityId}")]
        public HttpResponseMessage BackgroundImage(int facilityId)
        {

            var map = this._context.SvgMaps.FirstOrDefault(x => x.FacilityId == facilityId);
            var image = map?.BackgroundImage ?? new byte[] { };

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            //MemoryStream ms = new MemoryStream(image);
            //response.Content = new StreamContent(ms);
            //response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/png");

            response.Content = new ByteArrayContent(image);
            response.Content.LoadIntoBufferAsync(image.Length).Wait();

            //send response of image/png type
            return response;
        }


        [HttpGet("RoomParameterInfo/facility/{facilityId}")]
        public ActionResult<IEnumerable<Room>> RoomParameterInfo(int facilityId) {

            var rooms = this._context.Rooms.Include(room => room.RoomParameters).Where(r=>r.FacilityId == facilityId).ToList();
            // .Include(room => room.RoomParameters)
            //.Where(r=>r.FacilityId == facilityId).ToList();
            return rooms;
        }

    }
}