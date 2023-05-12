using Microsoft.AspNetCore.Mvc;
using FCISUI.Models;
using FCISUI.Data;
using AutoMapper;
using System.Net;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;

public class ContactUsMessage {
    public string FromAddress {get; set;}
    public string SubjectLine {get; set;}
    public string MessageBody {get;set;}
}
namespace FCISUI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class MessageController : ControllerBase 
    {
        private readonly FCISPortalContext _context;
        private readonly SmtpClient _mailClient;
        private readonly string _contactEmailAddress;

        public MessageController(FCISPortalContext context, IConfiguration config)
        {
            _context = context;
            var host = config.GetValue<string>("smtpHost");
            int port; 
            if (! int.TryParse(config.GetValue<string>("smtpPort") ?? "25", out port)) { port = 25;}
            _mailClient = new SmtpClient(config.GetValue<string>("smtpHost"),port);
            this._contactEmailAddress = config.GetValue<string>("contactEmailAddress");
        }


        [HttpPost("contactus")]
        public void PostContactUs(ContactUsMessage message)
        {
            try {
                var mailMessage = new MailMessage {
                    From = new MailAddress(message.FromAddress),
                    Subject = message.SubjectLine,
                    Body = message.MessageBody
                };

                mailMessage.To.Add(this._contactEmailAddress);
                this._mailClient.Send(mailMessage);
            }
            catch(Exception ex) {
                this._context.Add<Errorlog>(new Errorlog {
                    Errordate = DateTime.Now,
                    Errormessage = "Error PostContactUs with data: " + System.Text.Json.JsonSerializer.Serialize(message),
                    Errortrace = ex.ToString()
                });

                _context.SaveChanges();
            }

            
        }

    }
}

