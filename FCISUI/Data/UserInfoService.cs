using FCISUI.Models;
using System.Net.Http.Headers;
using System.Text.Json;

namespace FCISUI.Data
{

    public class UserInfo {
        public string sub { get; set; }
        public string name { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string preferred_username { get; set; }
        public string userid { get; set; }
        public string email { get; set; }
    }

    public interface IUserInfoService
    {
        Task<UserInfo> GetUserInfo(string token);
    }


    public class UserInfoService : IUserInfoService
    {
        private string _userInfoUrl;

        public UserInfoService(IConfiguration config)
        {
            this._userInfoUrl = config.GetValue<string>("userInfoUrl");
        }

        public async Task<UserInfo?> GetUserInfo(string token){
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var res = await  httpClient.GetAsync(this._userInfoUrl);
            var userInfo = await res.Content.ReadFromJsonAsync<UserInfo>();
            return userInfo;
        }


    }
}
