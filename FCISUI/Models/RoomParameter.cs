using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class RoomParameter
    {
        public int RoomParameterId { get; set; }
        public int RoomId { get; set; }

        public string Facility { get; set; }
        public string RoomNumber { get; set; }
        public string ConnectingRoom { get; set;}
        public string Parameter { get; set; }

        public string ISO {get; set;}
        public string SensorLocation { get; set; }
        public string SensorType {get; set;}
        public string CalibrationType { get; set; }
        public string CalibrationPeriod { get; set; }
        public string NextCalibration { get; set; }
        public string HTTE10 {get;set;}
        public string SiemensPointName { get; set; }
        public string JCIPointName { get; set; }

        public int ISOOrder {get; set; }
        public string RHTargetRange { get; set; }

    }
}

