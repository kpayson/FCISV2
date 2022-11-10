using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class PersonRole
    {
        public int PersonRoleId { get; set; }
        public int PersonId { get; set; }
        public int RoleId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Comments { get; set; }
    }
}
