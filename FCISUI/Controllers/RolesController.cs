using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FCISUI.Models;
using Microsoft.AspNetCore.Authorization;
using FCISUI.Data;

namespace FCISUI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly FCISPortalContext _context;
        private readonly IUserInfoService _userInfoService;

        public RolesController(FCISPortalContext context, IUserInfoService userInfoService)
        {
            _context = context;
            _userInfoService = userInfoService;
        }


        [HttpGet]
        [ResponseCache(NoStore = false, Location = ResponseCacheLocation.Any, Duration = 3600)]

        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            var roles = await _context.Roles.ToListAsync();
            return roles;
        }


        [HttpGet("currentUser")]
        public async Task<ActionResult<IEnumerable<string>>> CurrentUserRoles()
        {
            // call user info endpoint
            var authHeader = Request.Headers["Authorization"].First();
            var token = authHeader.Substring("Bearer ".Length);
            var userInfo = await _userInfoService.GetUserInfo(token);

            var user = await _context.People
                .Include(p=>p.PersonRoles)
                .ThenInclude(p=>p.Role)
                .FirstOrDefaultAsync(p=>p.UserId == userInfo.userid);
            if(user == null) {
                return new List<string>();
            }
            var roles = user.PersonRoles.Select(r=>r.Role.RoleName).ToList();

            return roles;
        }



    }
}
