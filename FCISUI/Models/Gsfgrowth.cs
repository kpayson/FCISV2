using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class Gsfgrowth
    {
        public int GsfGrowthId { get; set; }
        public string? FacilityName { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Iso8RoomsArea { get; set; }
        public int Iso8RoomsCount { get; set; }
        public int Iso7RoomsArea { get; set; }
        public int Iso7RoomsCount { get; set; }
        public int CncRoomsArea { get; set; }
        public int CncRoomsCount { get; set; }
        public int CriticalEnvironmentParametersCount { get; set; }
        public int MonitoredPointsPerDay { get; set;}
        public string EstimateOrActual {get; set;}

    }
}

    // {
    //     "GSFGrowthId": 10,
    //     "FacilityName": "CC Pharmacy P-IVAU",
    //     "Year": 2023,
    //     "Month": 5,
    //     "Iso8RoomsArea": 2115,
    //     "Iso8RoomsCount": 9,
    //     "Iso7RoomsArea": 2270,
    //     "Iso7RoomsCount": 19,
    //     "CncRoomsArea": 485,
    //     "CncRoomsCount": 6,
    //     "CriticalEnvironmentParametersCount": 136,
    //     "MonitoredPointsPerDay": 975104,
    //     "EstimateOrActual": "E"
    // },
