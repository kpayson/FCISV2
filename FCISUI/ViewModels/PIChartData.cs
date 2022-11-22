public class PIChartData

{

    public string RoomName;
    public string RoomNumber;
    public string SQ;
    public string ISO;
    public string ChillerStatus;
    public string Color;
    public string Tag;
    public long StartTime;
    public long EndTime;

    public PIChartData(string roomName, string roomNumber, string sQ, string iSO, string chillerstatus, string tag, long starttime, long endtime)

    {

        RoomName = roomName;
        RoomNumber = roomNumber;
        SQ = sQ;
        ISO = iSO;
        ChillerStatus = chillerstatus;
        Tag = tag;
        StartTime = starttime;
        EndTime = endtime;

    }
    public PIChartData(string chillername, string tag, string chillerstatus, long starttime, long endtime)

    {

        RoomName = chillername;
        ChillerStatus = chillerstatus;
        Tag = tag;
        StartTime = starttime;
        EndTime = endtime;

    }
}