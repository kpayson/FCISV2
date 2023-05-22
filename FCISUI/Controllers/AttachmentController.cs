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

    public class AttachmentGroup
    {
        //public AttachmentType AttachmentType {get; set;}
        public string Description {get; set;}
        public List<Attachment> Attachments {get;set;}
    }

    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AttachmentController : ControllerBase 
    {
        private readonly FCISPortalContext _context;
        private readonly IConfiguration _config;

        public AttachmentController(FCISPortalContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        private IQueryable<Attachment> _getAttachments(AttachmentFilter filter){
            var attachments = this._context.Attachments.Include(a=>a.AttachmentType).AsQueryable();
            if(filter.FacilityId.HasValue) {
                attachments = attachments.Where(a=>a.FacilityId == filter.FacilityId);
            }
            if(filter.AttachmentId.HasValue) {
                attachments = attachments.Where(a=>a.AttachmentId == filter.AttachmentId);
            }
            if(filter.AttachmentTypeId.HasValue) {
                attachments = attachments.Where(a=>a.AttachmentTypeId == filter.AttachmentTypeId);
            }
            if(! string.IsNullOrEmpty(filter.FileType)) {
                attachments = attachments.Where(a=>a.FileType == filter.FileType);
            }
            if(! string.IsNullOrEmpty(filter.StoredFileName)) {
                attachments = attachments.Where(a=>a.StoredFileName == filter.StoredFileName);
            }
            return attachments.AsQueryable();
        }
        [HttpGet()]
        [ResponseCache(NoStore = false, Location = ResponseCacheLocation.Any, Duration = 3600)]
        public async Task<ActionResult<List<Attachment>>> GetAttachments([FromQuery] AttachmentFilter filter)
        {
            var attachments = await this._getAttachments(filter).ToListAsync();
            return attachments;
        }

        [HttpGet("Pictures/facility/{facilityId}")]
        [ResponseCache(NoStore = false, Location = ResponseCacheLocation.Any, Duration = 3600)]
        public async Task<ActionResult<List<Attachment>>> GetPictures(int facilityId)
        {
            var attachments = await this._context.Attachments.Where(a=>a.FacilityId==facilityId && a.AttachmentTypeId==29).ToListAsync();
            return attachments;
        }

        [HttpGet("Documents/facility/{facilityId}")]
        [ResponseCache(NoStore = false, Location = ResponseCacheLocation.Any, Duration = 3600)]
        public async Task<ActionResult<List<AttachmentGroup>>> GetDocuments(int facilityId)
        {
            try {
                var attachments = await this._context.Attachments.Include(a=>a.AttachmentType).Where(a=>a.FacilityId==facilityId && a.AttachmentTypeId != 29).ToListAsync();
                // var groupedAttachments = attachments.GroupBy(atch=> atch.AttachmentType!.Description, atch=>atch).ToList();
                // return groupedAttachments;
                var groupedAttachments = 
                        attachments
                            .GroupBy(atch=>atch.AttachmentType!.Description, atch=>atch)
                            .Select(g=>new AttachmentGroup{
                                Description = g.Key,
                                Attachments = g.ToList()
                            })
                            .OrderBy(g=>g.Description)
                            .ToList();
                return groupedAttachments;
            }
            catch(Exception ex) {
                Console.Write(ex);
                throw;
            }

        }

        
    }
}