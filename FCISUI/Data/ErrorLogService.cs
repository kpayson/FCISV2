using FCISUI.Models;

namespace FCISUI.Data
{
    public interface IErrorLogService {
        public void LogError(string message, string trace);
    }


    public class ErrorLogService : IErrorLogService {
        private readonly FCISPortalContext _context;
        private readonly IConfiguration config;
        public ErrorLogService(FCISPortalContext context, IConfiguration config) {
            this._context = context;

            var baseUrl = config.GetValue<string>("piDataServiceBaseUrl");

            //config.GetSection("")
        }
        public void LogError(string message, string trace) {
            this._context.Add<Errorlog>(new Errorlog {
                Errormessage=message,
                Errortrace=trace
            });
            this._context.SaveChanges();
        }
    }
}
