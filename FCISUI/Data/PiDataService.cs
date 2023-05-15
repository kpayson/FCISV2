using FCISUI.ViewModels;
using System.Net.Http;
using System.Configuration;
using FCISUI.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FCISUI.Data
{
    public interface IPIDataService
    {
        // Task<IEnumerable<LocationTimeSeriesData>> LocationTimeSeriesData(IList<LocationQuery> locationQueries, DateTime startTime, DateTime endTime, int intervalInMinutes);
        Task<IEnumerable<LocationCurrentStatus>> CurrentStatusData(IList<LocationQuery> locationQueries);
        Task<List<CurrentValue>> CurrentStatusDataBatch(IList<string> tags); 
        Task<List<TimeSeriesPoint>> TimeSeriesData(string tag, DateTime startTime, DateTime endTime, int interval);

        Task<List<TimeSeriesBatch>> TimeSeriesDataBatch(List<string> tags, DateTime startTime, DateTime endTime, int interval);
        Task<List<dynamic>> APFLimits();
    }

    public class TimeSeriesPoint
    {
        public long Timestamp { get; set; }
        public double? numeric_value { get; set; }
        public double? raw_value {get; set;}
    }


    public class TimeSeriesBatch
    {
        public string tag {get; set;}
        public List<TimeSeriesPoint> data {get; set;}
    }


    public class LocationCurrentStatus
    {
        public string LocationName {get; set;} //Facility or Room
        public string Attribute {get;set;}
        // public bool ForDP {get;set;}
        public TimeSeriesPoint StatusPoint {get; set;}
    }

    public class LocationQuery
    {
        public string LocationName {get; set;} //Facility or Room
        public string Attribute {get;set;} 
        public string Tag {get; set;}
    }

    public class CurrentValue
    {
        public string Tag {get; set;}
        public int numeric_value {get; set;}
        public long Timestamp {get;set;}
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
                    try {
                        var timeSeries = await res.Content.ReadFromJsonAsync<IEnumerable<TimeSeriesPoint>>() ?? new List<TimeSeriesPoint>();
                        var point = new LocationCurrentStatus {
                            LocationName = loc.LocationName,
                            Attribute = loc.Attribute,
                            StatusPoint = timeSeries.First()
                        }; 
                        statusPoints.Add(point);
                    }
                    catch(Exception ex) {
                        Console.Write(ex);
                    }
                }

            }
            return statusPoints;
        }

        public async Task<List<CurrentValue>> CurrentStatusDataBatch(IList<string> tags) {
            var res = await this._httpClient.PostAsJsonAsync("/pi-api/current-value-batch", tags);
            var statusValues = await res.Content.ReadFromJsonAsync<List<CurrentValue>>() ?? new List<CurrentValue>();
            return statusValues;
        }


        public async Task<List<TimeSeriesPoint>> TimeSeriesData(string tag, DateTime startTime, DateTime endTime, int interval) {
            //var sw = System.Diagnostics.
            var startUTC = startTime.ToString("s");
            var endUTC = endTime.ToString("s");
            var timeSeriesPath = $"pi-api/time-series?tag={tag}&start_time={startUTC}&end_time={endUTC}&rectype=interpolated&interval={interval}m";
            try {
                var res = await this._httpClient.GetAsync(timeSeriesPath);
                var resString = await res.Content.ReadAsStringAsync();
                var timeSeries = await res.Content.ReadFromJsonAsync<IEnumerable<TimeSeriesPoint>>() ?? new List<TimeSeriesPoint>(); 
                var nonEmptyPoints = timeSeries.Where(p=>p.numeric_value != null).ToList();
                return nonEmptyPoints;
            }
            catch (Exception ex) {
                Console.Write(ex);
                return new List<TimeSeriesPoint>();
            }
        }

        public async Task<List<TimeSeriesBatch>> TimeSeriesDataBatch(List<string> tags, DateTime startTime, DateTime endTime, int interval) {
            var startUTC = startTime.ToString("s");
            var endUTC = endTime.ToString("s");

            try {

                var postData = new {
                    tags=tags,
                    start_time=startUTC,
                    end_time=endUTC,
                    interval=$"{interval}m",
                    rectype="interpolated"
                };

                var res = await this._httpClient.PostAsJsonAsync("/pi-api/time-series-batch", postData);
                var timeSeries = await res.Content.ReadFromJsonAsync<TimeSeriesBatch[]>() ?? new TimeSeriesBatch[]{};
                var timeSeriesList = timeSeries.ToList();

                return timeSeriesList; //timeSeries.ToList(); //timeSeries;
           }
            catch (Exception ex) {
                Console.Write(ex);
                throw ex;
            }
        }

        public async Task<List<dynamic>> APFLimits() {
            try {
                var res = await this._httpClient.GetAsync(@"pi-api/table-values?path=\\ORF-COGENAF\cGMP\APF_Limits");
                var limits = await res.Content.ReadFromJsonAsync<IEnumerable<dynamic>>() ?? new List<dynamic>();
                var limitList = limits.ToList();
                return limitList;
            }
            catch (Exception ex) {
                Console.Write(ex);
                throw ex;
           }
        }

    }
}
