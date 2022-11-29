using FCISUI.ViewModels;
using System.Net.Http;
using System.Configuration;

namespace FCISUI.Data
{
    public interface IPIDataService
    {
        List<PIChartData> CreateDataListFacility(DateTime starttime, DateTime endtime, int interval, int facid, string Attr);
        Task<object> GetCGMP();
    }

    public class PIDataService : IPIDataService
    {
        private IHttpClientFactory _httpClientFactory;
        private IConfiguration _config;

        public PIDataService(IConfiguration config, IHttpClientFactory httpClientFactory)
        {
            this._httpClientFactory= httpClientFactory;
            this._config = config;

        }

        public List<PIChartData> CreateDataListFacility(DateTime starttime, DateTime endtime, int interval, int facid, string Attr)
        {
            return new List<PIChartData>();
        }

        public async Task<object> GetCGMP()
        {
            var httpClient = _httpClientFactory.CreateClient("piDataService");
            var baseUrl = _config.GetValue<string>("piDataServiceBaseUrl");
            httpClient.BaseAddress = new Uri(baseUrl);

            var res = await httpClient.GetAsync("api/cGMP");
            return res.Content;

            //var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);

            //if (httpResponseMessage.IsSuccessStatusCode)
            //{
            //    using var contentStream =
            //        await httpResponseMessage.Content.ReadAsStreamAsync();

            //    GitHubBranches = await JsonSerializer.DeserializeAsync
            //        <IEnumerable<GitHubBranch>>(contentStream);
            //}
        }





    }
}

