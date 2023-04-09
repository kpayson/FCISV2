using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class Facility
    {
        public int FacilityId { get; set; }
        public string FacilityName { get; set; } = null!;
        public string? FacilityAbbrName { get; set; }
        public string FacilityIC { get; set; }
        public string? FacilitySection { get; set; }
        public string? FacilityBuilding { get; set; }
        public string? FacilityLocation { get; set; }
        public string? FacilityType { get; set; }
        public string? Description { get; set; }
        public string? Comments { get; set; }
        public int? SortOrder { get; set; }
        public string? PiPath { get; set; }
        public string? Attribute { get; set; }
        public string? CircleId { get; set; }
        public bool IsActive { get; set; }
        public string? FacilityRepName { get; set; }
        public string? FacilityFullName { get; set; }
    }
}
