using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class Gsfgrowth
    {
        public int GsfgrowthId { get; set; }
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
    }
}
