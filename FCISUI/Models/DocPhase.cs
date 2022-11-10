using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class DocPhase
    {
        public int DocPhaseId { get; set; }
        public string? DocPhase1 { get; set; }
        public string? Description { get; set; }
        public string? Comments { get; set; }
        public int? SortOrder { get; set; }
    }
}
