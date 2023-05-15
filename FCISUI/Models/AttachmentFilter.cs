using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class AttachmentFilter
    {
        public int? AttachmentId { get; set; }
        public int? AttachmentTypeId { get; set; }
        public string? FileType { get; set; }
        public string? StoredFileName { get; set; }
        public int? FacilityId { get; set; }

    }
}
