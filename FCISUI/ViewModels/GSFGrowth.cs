using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FCISUI.ViewModels
{
    public class GSFGrowthDelta //: IComparable<GSFGrowthDelta>
    {
        // public int Year { get; set; }
        // public int Month { get; set; }
        public int Iso7RoomsCount { get; set; }
        public int Iso8RoomsCount { get; set; }
        public int CncRoomsCount { get; set; }
        public int Iso7RoomsArea { get; set; }
        public int Iso8RoomsArea { get; set; }
        public int CncRoomsArea { get; set; }
        public int CriticalEnvironmentParametersCount { get; set; }

        public DateTime GoLiveDate { get; set; }

        // public int CompareTo(GSFGrowthDelta other)
        // {
        //     var size = 12 * this.Year + this.Month;
        //     var sizeOther = 12 * other.Year + other.Month;
        //     return size < sizeOther ? -1 : sizeOther < size ? 1 : 0;
        // }

    }

    public class GSFGrowthCumulative
    {
        public DateTime GoLiveDate { get; set; }
        public int Iso7RoomsCount { get; set; }
        public int Iso8RoomsCount { get; set; }
        public int CncRoomsCount { get; set; }
        public int Iso7RoomsArea { get; set; }
        public int Iso8RoomsArea { get; set; }
        public int CncRoomsArea { get; set; }
        public int CriticalEnvironmentParametersCount { get; set; }
    }


}