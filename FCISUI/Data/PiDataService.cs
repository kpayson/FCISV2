using FCISUI.ViewModels;
using System.Net.Http;
using System.Configuration;
using System.Text.Json;
using FCISUI.Models;

namespace FCISUI.Data
{
    public interface IPIDataService
    {
        Task<IEnumerable<LocationData>>  AllFacilityTimeSeriesData(IList<Facility> facilities, DateTime startTime, DateTime endTime, int intervalInMinutes);
        Task<IEnumerable<LocationData>> FacilityTimeSeriesData(IList<Room> rooms, DateTime startTime, DateTime endTime, int intervalInMinutes);
    }

    public class TimeSeriesPoint
    {
        // ex "Timestamp":1669438800000,"numeric_value":-0.0411938056
        public long Timestamp { get; set; }
        public double numeric_value { get; set; }
    }

    public class LocationData
    {
        public string LocationName {get; set;} //Facility or Room
        public string Tag {get; set;}
        public List<TimeSeriesPoint> Points {get; set;}
    }

    public class PIDataService : IPIDataService
    {
        private IHttpClientFactory _httpClientFactory;
        private IConfiguration _config;

        public PIDataService(IConfiguration config, IHttpClientFactory httpClientFactory, FCISPortalContext context)
        {
            this._httpClientFactory = httpClientFactory;
            this._config = config;
        }

        public async Task<IEnumerable<LocationData>> AllFacilityTimeSeriesData(IList<Facility> facilities, DateTime startTime, DateTime endTime, int intervalInMinutes) {

            var facilityPoints = new List<LocationData>();
            foreach(var fac in facilities) {
                var points = await TimeSeriesData(fac.PiPath!,startTime,endTime,intervalInMinutes);
                var facPoints = new LocationData{
                    LocationName = fac.FacilityName,
                    Tag = fac.PiPath!,
                    Points = points.ToList()
                };
                facilityPoints.Add(facPoints);
            }
            return facilityPoints;
        }


        public async Task<IEnumerable<LocationData>> FacilityTimeSeriesData(IList<Room> rooms, DateTime startTime, DateTime endTime, int intervalInMinutes)
        {
            var start = startTime.ToString("yyyy-MM-dd");
            var end = endTime.ToString("yyyy-MM-dd");
            var interval = $"{intervalInMinutes}m";

            var roomPoints = new List<LocationData>();
            foreach(var rm in rooms) {
                var points = await TimeSeriesData(rm.PiPath!,startTime,endTime,intervalInMinutes);
                var facPoints = new LocationData{
                    LocationName = rm.RoomNumber,
                    Tag = rm.PiPath!,
                    Points = points.ToList()
                };
                roomPoints.Add(facPoints);
            }
            return roomPoints;

            // tag=\\ORF-COGENAF\cGMP\cGMP\2J\2N3074\2N2J1_2N3074_DP|DP&start_time=2022-11-26&end_time=2022-11-27&rectype=interpolated&interval=10m
            // var timeSeriesPath = $"pi-api/time-series?tag={tag}&start_time={startTime}&end_time={endTime}&rectype=interpolated&interval={interval}";
            // var res = await httpClient.GetAsync(timeSeriesPath);
            // var timeSeries = await res.Content.ReadFromJsonAsync<IEnumerable<TimeSeriesPoint>>() ?? new List<TimeSeriesPoint>(); 

            // return timeSeries!;

        }

        private async Task<IEnumerable<TimeSeriesPoint>> TimeSeriesData(string tag, DateTime startTime, DateTime endTime, int interval) {
            var httpClient = _httpClientFactory.CreateClient("piDataService");
            var baseUrl = _config.GetValue<string>("piDataServiceBaseUrl");
            httpClient.BaseAddress = new Uri(baseUrl);
            var startYMD = startTime.ToString("yyyy-MM-dd");
            var endYMD = endTime.ToString("yyyy-MM-dd");
            var timeSeriesPath = $"pi-api/time-series?tag={tag}&start_time={startYMD}&end_time={endYMD}&rectype=interpolated&interval={interval}";
            var res = await httpClient.GetAsync(timeSeriesPath);
            var timeSeries = await res.Content.ReadFromJsonAsync<IEnumerable<TimeSeriesPoint>>() ?? new List<TimeSeriesPoint>(); 
            return timeSeries;
        }

// <select name="ctl00$cph_main$ddlStatusSelector" id="ddlStatusSelector" class="form-control" style="height:40px;width:180px;">
// 					<option value="Sum All">Composite Status</option>
// 					<option value="Temp">Temp Status</option>
// 					<option value="DP">dP Status</option>
// 					<option value="Hum">RH Status</option>
// 					<option selected="selected" value="Airx">ACH Status</option>

// 				</select>



    }
}
