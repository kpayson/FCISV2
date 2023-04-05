using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.Data;
using AutoMapper;
using System.Net;
using System.Linq;
using System.Collections.Generic;
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

        private readonly ISvgDataService _svgDataService;


        public SvgMapController(
            FCISPortalContext context,
            IPIDataService piDataService,
            ISvgDataService svgDataService,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _piDataService = piDataService;
            _svgDataService = svgDataService;

        }

        [HttpGet("{facilityId}")]
        public ActionResult<SvgMap> GetSvgMap(int facilityId, string marker = "pin")
        {
            try {

                // var svgMap = marker.ToLower() == "arrow" ?
                //     this._context.SvgMaps.Include(m=>m.SvgMapArrows).FirstOrDefault(x=>x.FacilityId == facilityId): 
                //     this._context.SvgMaps.Include(m=>m.SvgMapPins).FirstOrDefault(x=>x.FacilityId == facilityId);

                var svgMap = this._context.SvgMaps.First(x=>x.FacilityId == facilityId);

                if(marker.ToLower() == "arrow") {
                    var arrows = this._context.SvgMapArrows.Where(x=>x.SvgMapId == svgMap.Id).ToList();
                    svgMap.SvgMapArrows = arrows;
                    svgMap.SvgMapPins = new List<SvgMapPin>();
                }
                else {
                    var pins = this._context.SvgMapPins.Where(x=>x.SvgMapId == svgMap.Id).ToList();
                    svgMap.SvgMapPins = pins;
                    svgMap.SvgMapArrows = new List<SvgMapArrow>();
                }
                if(svgMap == null) {
                    throw new Exception("error unable to get svgMap");
                }

                // if((marker ?? "").ToLower() == "arrow" ) {
                //     var arrowFileName = $"FID{facilityId}_Arrows.svg";
                //     var arrows =  this._svgDataService.GetMapArrows(arrowFileName);
                //     svgMap.SvgMapArrows = arrows;
                //     svgMap.SvgMapPins = new List<SvgMapPin>();
                // }
                // else {
                //     var pinsFileName = $"FID{facilityId}_Pins.svg";
                //     List<SvgMapPin> pins;
                //     if(facilityId == 0) {
                //         pins = this._context.SvgMapPins.Where(p=>p.SvgMapId == svgMap.Id).Select(p=>new SvgMapPin{
                //             LocationId = p.LocationId,
                //             Title = p.Title,
                //             Cx = p.Cx,
                //             Cy = p.Cy,
                //             R =  p.R,
                //             Path = p.Path
                //          }).ToList();
                //     }
                //     else {
                //         pins = this._svgDataService.GetMapPins(pinsFileName); 
                //     }

                //     svgMap.SvgMapPins = pins;
                //     svgMap.SvgMapArrows = new List<SvgMapArrow>();
                // }
                
                svgMap.BackgroundImage = new Byte[]{};

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
            return rooms;
        }

    }
}

