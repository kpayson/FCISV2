using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class Role
    {
        public int RoleId { get; set; }
        public string Role1 { get; set; } = null!;
        public string? Description { get; set; }
        public string? Comments { get; set; }
        public int? SortOrder { get; set; }
    }
}
