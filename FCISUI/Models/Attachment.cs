using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class Attachment
    {
        public int AttachmentId { get; set; }
        public int? AttachmentTypeId { get; set; }
        public string? FileType { get; set; }
        public string? OriginalFileName { get; set; }
        public string? StoredFileName { get; set; }
        public int? FacilityId { get; set; }
        public string? DocTitle { get; set; }
        public string? DocDescription { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string? ControlledCopyLocation { get; set; }
        public string? Author { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public string? PriorRevisionDates { get; set; }
        public int? DocPhaseId { get; set; }
        public string? Comments { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? UploadPersonRoleId { get; set; }
        public int? LastEditPersonRoleId { get; set; }
        public DateTime? LastEditDate { get; set; }

        public virtual AttachmentType? AttachmentType {get;set;}
    }
}
