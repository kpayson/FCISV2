using OSIsoft.AF;
using OSIsoft.AF.Time;
using OSIsoft.AF.Asset;

using FCISUI.ViewModels;

namespace FCISUI.Data
{
    public interface IPIDataService
    {
        List<PIChartData> CreateDataListFacility(DateTime starttime, DateTime endtime, AFTimeSpan interval, int facid, string Attr);
    }

    public class PIDataService : IPIDataService
    {
        private PISystem myPISystem;
        private AFDatabase myDatabase;

        public PIDataService(IConfiguration config)
        {
            var piServer = config.GetValue<string>("PIServer");
            var piDatabase = config.GetValue<string>("PIDatabase");

            // var myPISystems = new PISystems(); // ERROR HERE
            // this.myPISystem = myPISystems[piServer];
            // this.myDatabase = myPISystems[piServer].Databases[piDatabase];
        }

        // public List<PIData> CreateDataListFacility(DateTime starttime, DateTime endtime,
        //     AFTimeSpan interval, int facid, string Attr)
        // {
        //     AFTimeRange timeRange1 = new AFTimeRange(starttime, endtime);
        //     AFElement myElement = myDatabase.Elements["cGMP"];
        //     AFAttribute myAttr = null;

        //     List<AFElement> dpElementList = new List<AFElement>();
        //     return new List<PIData>();
        // }
        // public static string GetStatus1(string Status)
        // {
        //     string StatusString = "";
        //     if (!PIData.IsNumeric(Status)) { StatusString = "Comm Loss"; }
        //     else
        //     {

        //         switch (Status)
        //         {
        //             case "0": //
        //             case "Within Spec":
        //                 StatusString = "Within Spec";
        //                 break;
        //             case "1": //
        //             case "Comm Loss":
        //                 StatusString = "Comm Loss";
        //                 break;
        //             case "2": //
        //             case "Warning":
        //                 StatusString = "Warning";
        //                 break;
        //             case "3": //
        //             case "Alarm (Out of Spec)":
        //                 StatusString = "Alarm (Out of Spec)";
        //                 break;

        //             default:
        //                 StatusString = "No Data";
        //                 break;
        //         }

        //     }
        //     return StatusString;
        // }
    
      public List<PIChartData> CreateDataListFacility(DateTime starttime, DateTime endtime,
            AFTimeSpan interval, int facid, string Attr) {
                return new List<PIChartData>();
            }
//     public List<PIChartData> CreateDataListFacility(DateTime starttime, DateTime endtime,
//             AFTimeSpan interval, int facid, string Attr)
//         {
//             DataModule dataModule = new DataModule();
//             List<PIChartData> datalist = new List<PIChartData>();

//             // string PIServer = ConfigurationManager.AppSettings["PIServer"];
//             // string PIDatabase = ConfigurationManager.AppSettings["PIDatabase"];
//             // PISystems myPIsystems = new PISystems();

//             PISystem myPISystem = this.myPISystem; //myPIsystems[PIServer];
//             AFDatabase myDatabase = this.myDatabase; // myPIsystems[PIServer].Databases[PIDatabase];
//             AFTimeRange timeRange1 = new AFTimeRange(starttime, endtime);
//             AFElement myElement = myDatabase.Elements["cGMP"];
//             AFAttribute myAttr = null;

//             List<AFElement> dpElementList = new List<AFElement>();

//             try
//             {
//                 if (facid > 0)
//                 {
//                     DataSet ds = CreateEquipmentList(facid);
//                     if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
//                     {
//                         foreach (DataRow row in ds.Tables[0].Rows)
//                         {
//                             string RoomNumber = row["RoomNumber"].ToString();
//                             string FacAbr = row["FacAbr"].ToString();
//                             if (row["RoomNumber"].ToString().Contains("_"))
//                             {

//                                 RoomNumber = RoomNumber.Replace("_", "-");
//                             }
//                             string _element = FacAbr + "\\" + RoomNumber;
//                             if (Attr.Equals("Sum All"))
//                             {
//                                 myAttr = myElement.Elements[_element].Attributes[row["Attribute"].ToString()];
//                             }

//                             else if (Attr.Equals("DP"))
//                             {

//                                 foreach (AFElement child in myElement.Elements)
//                                 {
//                                     foreach (AFElement child1 in child.Elements)
//                                     {
//                                         foreach (AFElement child2 in child1.Elements)
//                                         {
//                                             string mydpElement = child2.Name;
//                                             myAttr = child2.Attributes["DP"].Attributes["Status"];

//                                         }

//                                     }

//                                 }
//                             }
//                             else
//                             {
//                                 myAttr = myElement.Elements[_element].Attributes[Attr].Attributes["Status"];
//                             }

//                             if (myAttr != null)
//                             {
//                                 // MAKE SURE THIS MATCHES
//                                 // Dont pass interval for raw data
//                                 AFValues valsCHL = myAttr.Data.InterpolatedValues(
//                                            timeRange: timeRange1,
//                                            interval: interval,//for interpolated values
//                                                               //boundaryType: AFBoundaryType.Inside, //only for RecordedValues
//                                            desiredUOM: null,
//                                            filterExpression: null,
//                                            includeFilteredValues: false);
//                                 DateTime _timevalue = starttime;
//                                 DateTime _starttime = starttime;
//                                 DateTime _endtime = starttime;
//                                 string _status = " ";
//                                 int i = 0;
//                                 string Atr = "Status";
//                                 string url = row["PiPath"].ToString();
//                                 if (Attr.Equals("DP"))
//                                 {
//                                     url = url.Substring(0, url.Length - 1); Atr = "&type=dp";
//                                 }
//                                 else if (Attr.Equals("Sum All"))
//                                 {
//                                     url = url.Substring(0, url.Length - 1); Atr = "&type=status";
//                                 }
//                                 else
//                                 {
//                                     Atr = Attr;
//                                 }
//                                 url = url + Atr;
//                                 foreach (AFValue val in valsCHL)
//                                 {
//                                     if (DateTime.Compare(val.Timestamp, starttime) == 0)
//                                     {
//                                         _starttime = val.Timestamp;
//                                         _status = val.Value.ToString();
//                                     }
//                                     if (val.Value.ToString() != _status)
//                                     {
//                                         _endtime = val.Timestamp;
//                                         datalist.Add(new PIChartData(
//                                             row["Name"].ToString(),
//                                             row["RoomName"].ToString(),
//                                             row["SQ"].ToString(),
//                                             row["ISO"].ToString(),
//                                             GetStatus1(_status),
//                                             url,
//                                             (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds,
//                                             (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));
//                                         _status = val.Value.ToString();
//                                         _starttime = val.Timestamp;
//                                     }
//                                     else if (i == valsCHL.Count - 1)
//                                     {
//                                         _endtime = val.Timestamp;
//                                         datalist.Add(new PIChartData(row["RoomNumber"].ToString(),
//                                             row["RoomName"].ToString(), row["SQ"].ToString(), row["ISO"].ToString(),
//                                             GetStatus1(_status), url,
//                                             (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds, (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));
//                                     }

//                                     // datalist.Add(new RoomData(p.RoomName, GetStatus1(_status), (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds, (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));
//                                     i++;
//                                 }
//                             }
//                         }
//                     }
//                 }


//             }

//             catch (Exception ex)
//             {

//                 ErrorHandler.LogErrorToDB(0, "FacilityDashboard.CreateDataListForChart", "error in facid="
//                     + facid + ", Attribute=" + Attr, ex);

//             }
//             return datalist;
//         }
// }




    }
}

