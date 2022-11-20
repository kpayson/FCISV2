// public static List<PIChartData> GetDataToPopulateWindowB(DateTime StrStartDate, DateTime StrEndDate, int facid, string Atr, int interval)
// {
//     string strSt = StrStartDate.ToString("yyyy-MM-ddTHH:mm");
//     string strEnd = StrEndDate.ToString("yyyy-MM-ddTHH:mm");

//     AFTime start1 = new AFTime(strSt);
//     AFTime end1 = new AFTime(strEnd);
//     AFTimeRange timeRange1 = new AFTimeRange(start1, end1);

//     AFTimeSpan intervalAF = new AFTimeSpan(minutes: interval);//changed to variable
//     List<PIChartData> dataList = new List<PIChartData>();

//     if (facid == 0) // Old version. works only for Portfolio All
//     {
//         dataList = CreateDataList(end1, start1, intervalAF, facid, Atr);
//     }
//     else // All other facilities
//     {
//         if (Atr.Equals("DP"))
//         {
//             dataList = CreateDataListWindowB_DP(end1, start1, intervalAF, facid, Atr);
//         }
//         else if (Atr.Equals("Sum All"))
//         {
//             dataList = CreateDataListWindowB_SumAll_PIDirect(end1, start1, intervalAF, facid, Atr);
//         }
//         else
//         {
//             dataList = CreateDataListWindowB_PIDirect(end1, start1, intervalAF, facid, Atr);
//         }
//     }
//     Debug.WriteLine($" Window B dataList size: {dataList.Count()}");
//     return dataList;
// }

// public static List<PIChartData> CreateDataListWindowB_SumAll_PIDirect(DateTime starttime, DateTime endtime, AFTimeSpan interval, int facid, string Attr)
// {
//     DataModule dataModule = new DataModule();
//     List<PIChartData> datalist = new List<PIChartData>();
//     string PIServer = ConfigurationManager.AppSettings["PIServer"];
//     string PIDatabase = ConfigurationManager.AppSettings["PIDatabase"];
//     PISystems myPIsystems = new PISystems();
//     PISystem myPISystem = myPIsystems[PIServer];
//     AFDatabase myDatabase = myPIsystems[PIServer].Databases[PIDatabase];
//     AFTimeRange timeRange1 = new AFTimeRange(starttime, endtime);
//     AFElement myElement = myDatabase.Elements["cGMP"];
//     try
//     {
//         if (facid > 0)
//         {
//             DataSet ds = CreateEquipmentList(facid);
//             string FacAbr = "";
//             if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
//             {
//                 FacAbr = Convert.ToString(ds.Tables[0].Rows[0]["FacAbr"]);
//             }

//             // start new Window B data creation
//             foreach (Room r in AllRoomsDataListPIDirect)
//             {
//                 AFElement _fac = myElement.Elements.Where(x => x.Name.Equals(FacAbr)).FirstOrDefault<AFElement>();
//                 AFElement _room = _fac.Elements.Where(y => y.Name.Equals(r.Name)).FirstOrDefault<AFElement>();
//                 AFAttribute _attr = _room.Attributes["Status"];
//                 if (_attr != null)
//                 {
//                     string _status = " "; int i = 0;
//                     string Atr = "Status"; string url = "";
//                     url = @"\cGMP\" + _fac.Name + @"\" + _room.Name;
//                     Atr = "&type=status"; // @MM This needs to be updated
//                     url = url + Atr;
//                     AFValues valsCHL = _attr.Data.InterpolatedValues(
//                                    timeRange: timeRange1,
//                                    interval: interval,//for interpolated values
//                                                       //boundaryType: AFBoundaryType.Inside, //only for RecordedValues
//                                    desiredUOM: null,
//                                    filterExpression: null,
//                                    includeFilteredValues: false);
//                     DateTime _timevalue = starttime;
//                     DateTime _starttime = starttime;
//                     DateTime _endtime = starttime;
//                     string ISO = "n/a iso"; string SQ = "n/a sq";

//                     DataRow dr;
//                     try
//                     {
//                         dr = ds.Tables[0].Select("RoomNumber = '" + r.Name + "'").FirstOrDefault();
//                         if (dr != null && dr.ItemArray.Length > 0)
//                         {
//                             ISO = Convert.ToString(dr["ISO"]);
//                             SQ = Convert.ToString(dr["SQ"]); ;
//                         }
//                     }
//                     catch (Exception ex)
//                     {
//                         // do nothing, keep defaults
//                     }


//                     foreach (AFValue val in valsCHL)
//                     {
//                         if (DateTime.Compare(val.Timestamp, starttime) == 0)
//                         {
//                             _starttime = val.Timestamp;
//                             _status = val.Value.ToString();
//                         }
//                         if (val.Value.ToString() != _status)
//                         {
//                             _endtime = val.Timestamp;
//                             datalist.Add(new PIChartData(
//                                 _room.Name,
//                                 _room.Description,
//                                 SQ, // @MM PLACEHOLDER
//                                 ISO, // @MM PLACEHOLDER
//                                 GetStatus1(_status), url,
//                                 (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds, (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));
//                             _status = val.Value.ToString();
//                             _starttime = val.Timestamp;
//                         }
//                         else if (i == valsCHL.Count - 1)
//                         {
//                             _endtime = val.Timestamp;
//                             datalist.Add(new PIChartData(_room.Name,
//                                                          _room.Description,
//                                                          SQ, // @MM PLACEHOLDER
//                                                          ISO, // @MM PLACEHOLDER
//                                                          GetStatus1(_status),
//                                                          url,
//                                                          (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds,
//                                                          (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));

//                             // update pin status colors to only the current
//                         }

//                         // datalist.Add(new RoomData(p.RoomName, GetStatus1(_status), (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds, (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));
//                         i++;
//                     }
//                 }
//             }
//         }
//     }
//     catch (Exception ex)
//     {
//         ErrorHandler.LogErrorToDB(0, "FacilityDashboard.CreateDataListForChart", "error in facid="
//             + facid + ", Attribute=" + Attr, ex);
//     }

//     List<PIChartData> distinctDatalist = new List<PIChartData>();
//     distinctDatalist = datalist.GroupBy(p => new { p.ChillerStatus, p.Color, p.EndTime, p.RoomName, p.StartTime })
//                                .Select(g => g.FirstOrDefault())
//                                .ToList();



//     return distinctDatalist;
// }

// // *********** Working construct
// public static List<PIChartData> CreateDataListWindowB_PIDirect(DateTime starttime, DateTime endtime, AFTimeSpan interval, int facid, string Attr)
// {
//     DataModule dataModule = new DataModule();
//     List<PIChartData> datalist = new List<PIChartData>();
//     string PIServer = ConfigurationManager.AppSettings["PIServer"];
//     string PIDatabase = ConfigurationManager.AppSettings["PIDatabase"];
//     PISystems myPIsystems = new PISystems();
//     PISystem myPISystem = myPIsystems[PIServer];
//     AFDatabase myDatabase = myPIsystems[PIServer].Databases[PIDatabase];
//     AFTimeRange timeRange1 = new AFTimeRange(starttime, endtime);
//     AFElement myElement = myDatabase.Elements["cGMP"];
//     try
//     {
//         if (facid > 0)
//         {
//             DataSet ds = CreateEquipmentList(facid);
//             string FacAbr = "";
//             if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
//             {
//                 FacAbr = Convert.ToString(ds.Tables[0].Rows[0]["FacAbr"]);
//             }

//             // start new Window B data creation
//             foreach (Room r in AllRoomsDataListPIDirect)
//             {
//                 if (r.Name.Equals("1C166C"))
//                 {
//                     int test = 1;
//                 }

//                 AFElement _fac = myElement.Elements.Where(x => x.Name.Equals(FacAbr)).FirstOrDefault<AFElement>();
//                 AFElement _room = _fac.Elements.Where(y => y.Name.Equals(r.Name)).FirstOrDefault<AFElement>();
//                 AFAttribute _attr = _room.Attributes[GlobalAttr].Attributes["Status"];
//                 if (_attr != null)
//                 {
//                     string _status = " ";
//                     int i = 0;
//                     string Atr = "Status";
//                     string url = "";
//                     url = @"\cGMP\" + _fac.Name + @"\" + _room.Name;
//                     Atr = $"|{Attr}"; // @MM This needs to be updated
//                     url = url + Atr;
//                     AFValues valsCHL = _attr.Data.InterpolatedValues(
//                                    timeRange: timeRange1,
//                                    interval: interval,//for interpolated values
//                                                       //boundaryType: AFBoundaryType.Inside, //only for RecordedValues
//                                    desiredUOM: null,
//                                    filterExpression: null,
//                                    includeFilteredValues: false);
//                     DateTime _timevalue = starttime;
//                     DateTime _starttime = starttime;
//                     DateTime _endtime = starttime;
//                     string ISO = "n/a iso"; string SQ = "n/a sq"; //string _sensorType = "n/a";

//                     DataRow dr;
//                     try
//                     {
//                         dr = ds.Tables[0].Select("RoomNumber = '" + r.Name + "' and Parameter='" + Attr + "'").First(); // Attribute/Status types needs to be added here AFTER SQL is fixed
//                         if (dr != null && dr.ItemArray.Length > 0)
//                         {
//                             ISO = Convert.ToString(dr["ISO"]);
//                             SQ = Convert.ToString(dr["SQ"]); ;
//                             //_sensorType = Convert.ToString(dr["SensorType"]);
//                         }
//                     }
//                     catch (Exception ex)
//                     {
//                         // do nothing, keep defaults
//                     }

//                     foreach (AFValue val in valsCHL)
//                     {
//                         if (DateTime.Compare(val.Timestamp, starttime) == 0)
//                         {
//                             _starttime = val.Timestamp;
//                             _status = val.Value.ToString();
//                         }
//                         if (val.Value.ToString() != _status)
//                         {
//                             _endtime = val.Timestamp;
//                             datalist.Add(new PIChartData(
//                                 _room.Name,
//                                 _room.Description,
//                                 SQ, // @MM PLACEHOLDER
//                                 ISO, // @MM PLACEHOLDER
//                                 GetStatus1(_status), url,
//                                 (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds, (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));
//                             _status = val.Value.ToString();
//                             _starttime = val.Timestamp;
//                         }
//                         else if (i == valsCHL.Count - 1)
//                         {
//                             _endtime = val.Timestamp;
//                             datalist.Add(new PIChartData(_room.Name,
//                                                          _room.Description,
//                                                          SQ, // @MM PLACEHOLDER
//                                                          ISO, // @MM PLACEHOLDER
//                                                          GetStatus1(_status),
//                                                          url,
//                                                          (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds,
//                                                          (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));

//                             // update pin status colors to only the current
//                         }

//                         // datalist.Add(new RoomData(p.RoomName, GetStatus1(_status), (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds, (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));
//                         i++;
//                     }
//                 }
//             }
//         }
//     }
//     catch (Exception ex)
//     {
//         ErrorHandler.LogErrorToDB(0, "FacilityDashboard.CreateDataListForChart", "error in facid="
//             + facid + ", Attribute=" + Attr, ex);
//     }

//     List<PIChartData> distinctDatalist = new List<PIChartData>();
//     distinctDatalist = datalist.GroupBy(p => new { p.ChillerStatus, p.Color, p.EndTime, p.RoomName, p.StartTime })
//                                .Select(g => g.FirstOrDefault())
//                                .ToList();



//     return distinctDatalist;
// }

// public static List<PIChartData> CreateDataListWindowB_DP(DateTime starttime, DateTime endtime, AFTimeSpan interval, int facid, string Attr)
// {
//     DataModule dataModule = new DataModule();
//     List<PIChartData> datalist = new List<PIChartData>();
//     string PIServer = ConfigurationManager.AppSettings["PIServer"];
//     string PIDatabase = ConfigurationManager.AppSettings["PIDatabase"];
//     PISystems myPIsystems = new PISystems();
//     PISystem myPISystem = myPIsystems[PIServer];
//     AFDatabase myDatabase = myPIsystems[PIServer].Databases[PIDatabase];
//     AFTimeRange timeRange1 = new AFTimeRange(starttime, endtime);
//     AFElement myElement = myDatabase.Elements["cGMP"];
//     List<AFElement> dpElementList = new List<AFElement>();
//     AFAttribute myAttr;
//     try
//     {
//         if (facid > 0)
//         {
//             DataSet ds = CreateEquipmentList(facid);
//             string FacAbr = "";
//             if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
//             {
//                 foreach (DataRow row in ds.Tables[0].Rows)
//                 {
//                     FacAbr = row["FacAbr"].ToString(); // add error handling just in case the FacAbr value is not consistent
//                 }
//             }

//             AFElement FacChild = myElement.Elements.Where(x => x.Name.Equals(FacAbr)).FirstOrDefault<AFElement>();
//             if (FacChild != null)
//             {
//                 foreach (AFElement RoomChild in FacChild.Elements)
//                 {
//                     foreach (AFElement DPRoomChild in RoomChild.Elements)
//                     {
//                         string mydpElement = DPRoomChild.Name;
//                         myAttr = DPRoomChild.Attributes["DP"].Attributes["Status"];
//                         if (myAttr != null)
//                         {
//                             string _status = " "; int i = 0;
//                             string Atr = "Status"; string url = "";
//                             url = @"\cGMP\" + FacChild.Name + @"\" + RoomChild.Name; /*+ @"\" + DPRoomChild.Name;*/
//                             Atr = "&type=dp"; // @MM This needs to be updated
//                             url = url + Atr;
//                             AFValues valsCHL = myAttr.Data.InterpolatedValues(
//                                            timeRange: timeRange1,
//                                            interval: interval,//for interpolated values
//                                                               //boundaryType: AFBoundaryType.Inside, //only for RecordedValues
//                                            desiredUOM: null,
//                                            filterExpression: null,
//                                            includeFilteredValues: false);
//                             DateTime _timevalue = starttime;
//                             DateTime _starttime = starttime;
//                             DateTime _endtime = starttime;

//                             foreach (AFValue val in valsCHL)
//                             {
//                                 if (DateTime.Compare(val.Timestamp, starttime) == 0)
//                                 {
//                                     _starttime = val.Timestamp;
//                                     _status = val.Value.ToString();
//                                 }
//                                 if (val.Value.ToString() != _status)
//                                 {
//                                     _endtime = val.Timestamp;
//                                     datalist.Add(new PIChartData(
//                                         DPRoomChild.Name,
//                                         DPRoomChild.Name,
//                                         "n/a",
//                                         "n/a",
//                                         GetStatus1(_status), url,
//                                         (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds, (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));
//                                     _status = val.Value.ToString();
//                                     _starttime = val.Timestamp;
//                                 }
//                                 else if (i == valsCHL.Count - 1)
//                                 {
//                                     _endtime = val.Timestamp;
//                                     datalist.Add(new PIChartData(DPRoomChild.Name,
//                                                                  DPRoomChild.Name,
//                                                                  "n/a",
//                                                                  "n/a",
//                                                                  GetStatus1(_status),
//                                                                  url,
//                                                                  (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds,
//                                                                  (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));

//                                     // update pin status colors to only the current
//                                 }

//                                 // datalist.Add(new RoomData(p.RoomName, GetStatus1(_status), (long)(_starttime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds, (long)(_endtime - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds));
//                                 i++;
//                             }
//                         }

//                     }

//                 }
//             }
//             //    }
//             //}
//         }
//     }
//     catch (Exception ex)
//     {
//         ErrorHandler.LogErrorToDB(0, "FacilityDashboard.CreateDataListForChart", "error in facid="
//             + facid + ", Attribute=" + Attr, ex);
//     }

//     List<PIChartData> distinctDatalist = new List<PIChartData>();
//     distinctDatalist = datalist.GroupBy(p => new { p.ChillerStatus, p.Color, p.EndTime, p.RoomName, p.StartTime })
//                                .Select(g => g.FirstOrDefault())
//                                .ToList();



//     return distinctDatalist;
// }



// // Gets the Unit of Measure for the attribute
// public static string GetUOM()
// {
//     if (GlobalAttr.Equals("Airx"))
//     {
//         return "";
//     }
//     else if (GlobalAttr.Equals("Temp"))
//     {
//         return " °F";
//     }
//     else if (GlobalAttr.Equals("Hum"))
//     {
//         return " %";
//     }
//     else if (GlobalAttr.Equals("DP"))
//     {
//         return " psi";
//     }
//     else
//     {
//         return "";
//     }
// }


