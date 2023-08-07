using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class Person
    {
        public int PersonId { get; set; }
        public string LastName { get; set; } = null!;
        public string? FirstName { get; set; }
        public string? Miname { get; set; }
        public string? UserId { get; set; }
        public string? Nihid { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Ic { get; set; }
        public string? Org { get; set; }
        public string? OrgAbbr { get; set; }
        public string? Title { get; set; }
        public string? Comments { get; set; }
        public int? Active { get; set; }

        // public List<Role> Roles { get; } = new();
        public virtual ICollection<PersonRole> PersonRoles {get; set;}
        // public virtual ICollection<Role> Roles {get; set;}
    }
}
