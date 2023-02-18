using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class Room
    {
        public int RoomId { get; set; }
        public int? FacilityId { get; set; }
        public string? Facility { get; set; }
        public string? RoomNumber { get; set; }
        public int? Sq { get; set; }
        public string? RoomName { get; set; }

        // public string? Parameter { get; set; }
        // public string? Iso { get; set; }
        // public string? ConnectingRoom { get; set; }
        // public string? SensorLocation { get; set; }
        // public string? SensorType { get; set; }
        // public string? CalibrationType { get; set; }
        // public string? CalibrationPeriod { get; set; }
        // public string? NextCalibration { get; set; }
        // public string? Htte10 { get; set; }
        // public string? SiemensPointName { get; set; }
        // public string? JcipointName { get; set; }
        // public string? Column1 { get; set; }
        // public int? Isoorder { get; set; }
        // public bool? IsActive { get; set; }
        // public string? Attribute { get; set; }
        // public int? Units { get; set; }
        // public string? PiPath { get; set; }

        // public string? RhtargetRange { get; set; }
        // public string? FormatedName { get; set; }
    }
}
