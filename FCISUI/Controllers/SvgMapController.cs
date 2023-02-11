using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using AutoMapper;
using System.Data.Entity;
using System.Net;
using System.Net.Http.Headers;

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
        public SvgMap GetSvgMap(int facilityId)
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
                Console.Write(ex);
                return null;
            }
        }

        //[HttpGet("BackgroundImage/{facilityId}")]
        //public byte[] BackgroundImage(int facilityId)
        //{
        //    try
        //    {
        //        var map = this._context.SvgMaps.FirstOrDefault(x => x.FacilityId == facilityId);
        //        var image = map?.BackgroundImage ?? new byte[] {};

        //        return image;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex);
        //        throw;
        //    }
        //}

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

    }
}