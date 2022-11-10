using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class DocCategory
    {
        public int DocCategoryId { get; set; }
        public string? Category { get; set; }
        public string? Description { get; set; }
        public string? Comments { get; set; }
        public int? SortOrder { get; set; }
    }
}
