using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class RoomOld
    {
        public int RoomId { get; set; }
        public int? FacilityId { get; set; }
        public string? RoomNumber { get; set; }
        public string? RoomName { get; set; }
        public string? PiPath { get; set; }
        public int? Sq { get; set; }
        public string? Attribute { get; set; }
        public bool? IsActive { get; set; }
        public int? Units { get; set; }
        public int? EquipmentId { get; set; }
        public string? Iso { get; set; }
        public int? Isoorder { get; set; }
    }
}