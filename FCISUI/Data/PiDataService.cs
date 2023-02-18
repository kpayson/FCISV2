using FCISUI.ViewModels;
using System.Net.Http;
using System.Configuration;
using System.Text.Json;
using FCISUI.Models;

namespace FCISUI.Data
{
    public interface IPIDataService
    {
        Task<IEnumerable<LocationTimeSeriesData>> LocationTimeSeriesData(IList<LocationQuery> locationQueries, DateTime startTime, DateTime endTime, int intervalInMinutes);
        Task<IEnumerable<LocationCurrentStatus>> CurrentStatusData(IList<LocationQuery> locationQueries);
        // Task<IEnumerable<LocationTimeSeriesData>>  AllFacilityTimeSeriesData(IList<Facility> facilities, DateTime startTime, DateTime endTime, int intervalInMinutes);
        // Task<IEnumerable<LocationTimeSeriesData>> FacilityTimeSeriesData(IList<Room> rooms, DateTime startTime, DateTime endTime, int intervalInMinutes);
    }

    public class TimeSeriesPoint
    {
        public long Timestamp { get; set; }
        public double? numeric_value { get; set; }

        // public int? StatusValue { get { return (int)this.numeric_value;}}
    }

    public class LocationTimeSeriesData
    {
        public string LocationName {get; set;} //Facility or Room
        public string Tag {get; set;}
        public List<TimeSeriesPoint> Points {get; set;}
    }

    public class LocationCurrentStatus
    {
        public string LocationName {get; set;} //Facility or Room
        public TimeSeriesPoint StatusPoint {get; set;}
    }

    public class LocationQuery
    {
        public string LocationName {get; set;} //Facility or Room
        public string Tag {get; set;}
    }

    public class PIDataService : IPIDataService
    {

        private HttpClient _httpClient;

        public PIDataService(IConfiguration config, IHttpClientFactory httpClientFactory, FCISPortalContext context)
        {
            this._httpClient = httpClientFactory.CreateClient("piDataService");
            var baseUrl = config.GetValue<string>("piDataServiceBaseUrl");
            _httpClient.BaseAddress = new Uri(baseUrl);
        }

        public async Task<IEnumerable<LocationCurrentStatus>> CurrentStatusData(IList<LocationQuery> locationQueries) {

            var statusPoints = new List<LocationCurrentStatus>();
            foreach(var loc in locationQueries) {
                var currentDataPath = $"pi-api/current-value?tag={loc.Tag}";
                var res = await this._httpClient.GetAsync(currentDataPath);
                if(res.IsSuccessStatusCode) {
                    var timeSeries = await res.Content.ReadFromJsonAsync<IEnumerable<TimeSeriesPoint>>() ?? new List<TimeSeriesPoint>();
                    var point = new LocationCurrentStatus {
                        LocationName = loc.LocationName,
                        StatusPoint = timeSeries.First()
                    }; 
                    statusPoints.Add(point);
                }

            }
            return statusPoints;
        }

        public async Task<IEnumerable<LocationTimeSeriesData>> LocationTimeSeriesData(IList<LocationQuery> locationQueries, DateTime startTime, DateTime endTime, int intervalInMinutes) {

            // tag=\\ORF-COGENAF\cGMP\cGMP\2J\2N3074\2N2J1_2N3074_DP|DP&start_time=2022-11-26&end_time=2022-11-27&rectype=interpolated&interval=10m
            var facilityPoints = new List<LocationTimeSeriesData>();
            foreach(var loc in locationQueries) {
                var points = await TimeSeriesData(loc.Tag!,startTime,endTime,intervalInMinutes);
                var facPoints = new LocationTimeSeriesData{
                    LocationName = loc.LocationName,
                    Tag = loc.Tag!,
                    Points = points.ToList()
                };
                facilityPoints.Add(facPoints);
            }
            return facilityPoints;
        }

        private async Task<IEnumerable<TimeSeriesPoint>> TimeSeriesData(string tag, DateTime startTime, DateTime endTime, int interval) {
            var startUTC = startTime.ToString("s");
            var endUTC = endTime.ToString("s");
            var timeSeriesPath = $"pi-api/time-series?tag={tag}&start_time={startUTC}&end_time={endUTC}&rectype=interpolated&interval={interval}m";
            try {
                var res = await this._httpClient.GetAsync(timeSeriesPath);
                var timeSeries = await res.Content.ReadFromJsonAsync<IEnumerable<TimeSeriesPoint>>() ?? new List<TimeSeriesPoint>(); 
                var nonEmptyPoints = timeSeries.Where(p=>p.numeric_value != null);
                return nonEmptyPoints;
            }
            catch (Exception ex) {
                Console.Write(ex);
                throw ex;
                //return new List<TimeSeriesPoint>();
            }

        }



// return https://orfd-cogen.ors.nih.gov/pi-api/time-series?tag=\\ORF-COGENAF\cGMP\cGMP\PET_1|Facility_Status_Check&start_time=${startDate.toISOString()}&end_time=${endDate.toISOString()}&rectype=interpolated&interval=10m


        // public async Task AllFacilityCurrentStatus() {}
        // public async Task<IEnumerable<LocationTimeSeriesData>> AllFacilityTimeSeriesData(IList<Facility> facilities, DateTime startTime, DateTime endTime, int intervalInMinutes) {

        //     var facilityPoints = new List<LocationTimeSeriesData>();
        //     foreach(var fac in facilities) {
        //         var points = await TimeSeriesData(fac.PiPath!,startTime,endTime,intervalInMinutes);
        //         var facPoints = new LocationTimeSeriesData{
        //             LocationName = fac.FacilityName,
        //             Tag = fac.PiPath!,
        //             Points = points.ToList()
        //         };
        //         facilityPoints.Add(facPoints);
        //     }
        //     return facilityPoints;
        // }


        // public async Task<IEnumerable<LocationTimeSeriesData>> FacilityTimeSeriesData(IList<Room> rooms, DateTime startTime, DateTime endTime, int intervalInMinutes)
        // {
        //     var roomPoints = new List<LocationTimeSeriesData>();
        //     foreach(var rm in rooms) {
        //         var points = await TimeSeriesData(rm.PiPath!,startTime,endTime,intervalInMinutes);
        //         var facPoints = new LocationTimeSeriesData{
        //             LocationName = rm.RoomNumber,
        //             Tag = rm.PiPath!,
        //             Points = points.ToList()
        //         };
        //         roomPoints.Add(facPoints);
        //     }
        //     return roomPoints;

        //     // tag=\\ORF-COGENAF\cGMP\cGMP\2J\2N3074\2N2J1_2N3074_DP|DP&start_time=2022-11-26&end_time=2022-11-27&rectype=interpolated&interval=10m
        //     // var timeSeriesPath = $"pi-api/time-series?tag={tag}&start_time={startTime}&end_time={endTime}&rectype=interpolated&interval={interval}";
        //     // var res = await httpClient.GetAsync(timeSeriesPath);
        //     // var timeSeries = await res.Content.ReadFromJsonAsync<IEnumerable<TimeSeriesPoint>>() ?? new List<TimeSeriesPoint>(); 

        //     // return timeSeries!;
        // }


// <select name="ctl00$cph_main$ddlStatusSelector" id="ddlStatusSelector" class="form-control" style="height:40px;width:180px;">
// 					<option value="Sum All">Composite Status</option>
// 					<option value="Temp">Temp Status</option>
// 					<option value="DP">dP Status</option>
// 					<option value="Hum">RH Status</option>
// 					<option selected="selected" value="Airx">ACH Status</option>

// 				</select>



    }
}
