using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FCISUI.Models;
using Microsoft.AspNetCore.Authorization;

namespace FCISUI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly FCISPortalContext _context;

        public RolesController(FCISPortalContext context)
        {
            _context = context;
        }


        // [HttpGet]
        // [ResponseCache(NoStore = false, Location = ResponseCacheLocation.Any, Duration = 3600)]

        // public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        // {
        //     var roles = await _context.Roles.ToListAsync();
        //     return roles;
        // }


        // [HttpGet("userid/{userId}")]
        // [ResponseCache(NoStore = false, Location = ResponseCacheLocation.Any, Duration = 3600)]
        // public async Task<ActionResult<IEnumerable<Role>>> PersonRoles(string userId)
        // {
        //     var user = await _context.People.Include(p=>p.Roles).FirstOrDefaultAsync(p=>p.UserId == userId);
        //     var roles = user.Roles.ToList();
        //     return roles;
        // }


    }
}
