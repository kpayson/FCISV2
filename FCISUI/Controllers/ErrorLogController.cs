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

    public class AppSettings {
        public string PIServer {get; set;}
        public string PIDatabaseEnv { get; set; }
        public string PIDatabase { get; set; }
        public string PIDataServiceBaseUrl { get; set; }
    }


    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ErrorLogController : ControllerBase 
    {
        private readonly FCISPortalContext _context;
        private readonly IConfiguration _config;

        public ErrorLogController(FCISPortalContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Errorlog>>> GetErrorLogs()
        {
            var errorLogs = await this._context.Errorlogs.ToListAsync();
            return errorLogs;
        }

        [HttpGet("appSettings")]
        public async Task<ActionResult<AppSettings>> GetSettings() {
            var settings = new AppSettings {
                PIServer=_config.GetValue<string>("PIServer"),
                PIDatabaseEnv=_config.GetValue<string>("PIDatabaseEnv"),
                PIDatabase=_config.GetValue<string>("PIDatabase"),
                PIDataServiceBaseUrl=_config.GetValue<string>("piDataServiceBaseUrl")
            };

            return settings;
        }


        [HttpPost]
        public async Task<ActionResult<Errorlog>> PostErrorLog(Errorlog errorLog)
        {
            _context.Errorlogs.Add(errorLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetErrorlog", new { id = errorLog.Errorlogid }, errorLog);
        }

    }
}