using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class AttachmentType
    {
        public int AttachmentTypeId { get; set; }
        public int? DocCategoryId { get; set; }
        public string? AttachmentType1 { get; set; }
        public string? Description { get; set; }
        public string? Comments { get; set; }
        public int? SortOrder { get; set; }
    }
}
