using FCISUI.ViewModels;
using System.Net.Http;
using System.Configuration;
using System.Text.Json;

namespace FCISUI.Data
{
    public interface IPIDataService
    {
        // List<PIChartData> CreateDataListFacility(DateTime starttime, DateTime endtime, int interval, int facid, string Attr);
        Task<IEnumerable<TimeSeriesPoint>> GetTimeSeriesData(string tag, string startTime, string endTime, string interval);
    }

    public class TimeSeriesPoint
    {
        // ex "Timestamp":1669438800000,"numeric_value":-0.0411938056
        long Timestamp { get; set; }
        double numeric_value { get; set; }
    }

    public class PIDataService : IPIDataService
    {
        private IHttpClientFactory _httpClientFactory;
        private IConfiguration _config;

        public PIDataService(IConfiguration config, IHttpClientFactory httpClientFactory)
        {
            this._httpClientFactory = httpClientFactory;
            this._config = config;

        }

        // public List<PIChartData> CreateDataListFacility(DateTime starttime, DateTime endtime, int interval, int facid, string Attr)
        // {
        //     return new List<PIChartData>();
        // }

        public async Task<IEnumerable<TimeSeriesPoint>> GetTimeSeriesData(string tag, string startTime, string endTime, string interval)
        {
            var httpClient = _httpClientFactory.CreateClient("piDataService");
            var baseUrl = _config.GetValue<string>("piDataServiceBaseUrl");
            httpClient.BaseAddress = new Uri(baseUrl);

            // tag=\\ORF-COGENAF\cGMP\cGMP\2J\2N3074\2N2J1_2N3074_DP|DP&start_time=2022-11-26&end_time=2022-11-27&rectype=interpolated&interval=10m
            var timeSeriesPath = $"pi-api/time-series?tag={tag}&start_time={startTime}&end_time={endTime}&rectype=interpolated&interval={interval}";
            var res = await httpClient.GetAsync(timeSeriesPath);
            var timeSeries = await res.Content.ReadFromJsonAsync<IEnumerable<TimeSeriesPoint>>() ?? new List<TimeSeriesPoint>(); 

            return timeSeries!;
        }





    }
}
