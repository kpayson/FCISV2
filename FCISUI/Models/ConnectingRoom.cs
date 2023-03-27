namespace FCISUI.Models
{
    public class ConnectingRoom
    {
        public int ConnectingRoomId { get; set;}

        public int RoomId { get; set;}
        public int FacilityId {get; set;} 
        public string Facility {get; set;}

        public int ConnectedRoomId { get; set;}
        public string RoomName { get; set;}
        public string RoomNumber {get; set;}
        public string ConnectedRoomNumber {get; set;}

        public Boolean IsActive {get; set;}
        public string FormattedName {get;set;}
    }
}