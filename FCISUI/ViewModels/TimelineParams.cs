namespace FCISUI.ViewModels
{
    public class FacilityAllTimelineParams
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Interval { get; set; }
    }

    public class FacilityTimelineParams
    {
        public int FacilityId {get; set;}
        public string Attr {get; set;}
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Interval { get; set; }
    }

    public class RoomTimelineParams
    {
        public string RoomNumber {get; set;}
        public string Attr {get; set;}
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Interval { get; set; }
    }
}
