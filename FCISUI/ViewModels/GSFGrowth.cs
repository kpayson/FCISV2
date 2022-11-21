namespace FCISUI.ViewModels
{
    public class GSFGrowthDelta //: IComparable<GSFGrowthDelta>
    {
        public int Iso7RoomsCount { get; set; }
        public int Iso8RoomsCount { get; set; }
        public int CncRoomsCount { get; set; }
        public int Iso7RoomsArea { get; set; }
        public int Iso8RoomsArea { get; set; }
        public int CncRoomsArea { get; set; }
        public int CriticalEnvironmentParametersCount { get; set; }

        public DateTime GoLiveDate { get; set; }
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