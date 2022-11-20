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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetData()
        {
            return new List<string>() { "RedTriange", "BlueSquare" };
        }

    }
}
