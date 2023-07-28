// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

// using DAL;
// using DAL.Core;
// using DAL.Core.Interfaces;
// using DAL.Models;
// using IdentityServer4.AccessTokenValidation;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using Microsoft.OpenApi.Models;
// using Quick_Application1.Authorization;
// using Quick_Application1.Helpers;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using FCISUI.Data;
using FCISUI.Models;
using System.Text.Json;
using System.Text.Json.Nodes;
// using AppPermissions = DAL.Core.ApplicationPermissions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace FCISUI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //builder.Configuration.AddJsonFile("appsettings.json").Build();
            //builder.Configuration.AddJsonFile("appsettings.local.json");

            AddServices(builder);// Add services to the container.

            var app = builder.Build();
            var settings = app.Configuration.Get<AppSettings>();



            ConfigureRequestPipeline(app); // Configure the HTTP request pipeline.

            InitializeDatabase(app); //ensure database is created

            app.Run();
        }

        private static void InitializeDatabase(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                // var seedDataFolder = app.Configuration.GetSection("seedDataFolder").Value;
                // var logger = services.GetRequiredService<ILogger<Program>>();
                var context = services.GetRequiredService<FCISPortalContext>();
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                //context.Database.Migrate();
            }
        }


        private static void AddServices(WebApplicationBuilder builder)
        {
            var settings = builder.Configuration.Get<AppSettings>();

            builder.Services.AddHttpClient();

            builder.Services.AddCors();

            builder.Services.AddControllersWithViews().AddJsonOptions(options =>
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

            builder.Services.AddDbContext<FCISPortalContext>(options =>

            options.UseInMemoryDatabase(databaseName: "FCISInMem"));
            //options.UseSqlServer(builder.Configuration.GetConnectionString("FCIS")));

            builder.Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = settings.OidcIssuer; //"https://your-identity-provider-url"; // Set the URL of your Identity Provider
                    options.Audience = settings.OidcClientId; // Set the audience value of your API resource
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = false, //true,
                        ValidIssuer = settings.OidcIssuer, //"https://stsstg.nih.gov",
                        ValidAudience = settings.OidcClientId, // "556a5a98-f1cd-4b98-aade-19f8bbbee22f" 
                        // IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("your-signing-key")) // Set the signing key used to sign the JWT tokens
                    };
                });
            builder.Services.AddAuthorization();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FCISAPI", Version = "v1" });
            });

            builder.Services.AddAutoMapper(typeof(Program));

            // Configurations
            builder.Services.Configure<AppSettings>(builder.Configuration);

            // Business Services
            //builder.Services.AddScoped<IEmailSender, EmailSender>();
            builder.Services.AddScoped<IPIDataService, PIDataService>();
            builder.Services.AddScoped<ISvgDataService, SvgDataService>();
            builder.Services.AddScoped<IErrorLogService, ErrorLogService>();

        }


        private static void ConfigureRequestPipeline(WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                IdentityModelEventSource.ShowPII = true;
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());

            //app.UseIdentityServer();
            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.DocumentTitle = "Swagger UI - Quick_Application1";
                c.SwaggerEndpoint("/swagger/v1/swagger.json", $"V1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");

                endpoints.Map("api/{**slug}", context =>
                {
                    context.Response.StatusCode = StatusCodes.Status404NotFound;
                    return Task.CompletedTask;
                });

                endpoints.MapFallbackToFile("index.html");
            });

            // app.UseExceptionHandler(appError=>{
            //     //appError.
            // });
        }



    }
}
