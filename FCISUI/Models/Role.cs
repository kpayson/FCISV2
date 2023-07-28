using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = null!;
        public string? Description { get; set; }
        public string? Comments { get; set; }
        public int? SortOrder { get; set; }

        //public List<Person> People { get; } = new();
        public virtual ICollection<PersonRole> PersonRoles {get; set;}
        // public virtual ICollection<Person> Person {get; set;}
    }
}
