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

namespace FCISUI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Configuration.AddJsonFile("appsettings.json").Build();
            builder.Configuration.AddJsonFile("appsettings.local.json");

            AddServices(builder);// Add services to the container.

            var app = builder.Build();

            ConfigureRequestPipeline(app); // Configure the HTTP request pipeline.

            var settings = app.Configuration.Get<AppSettings>();


            SeedDatabase(app); //Seed initial database

            // CreateDbIfNotExists(app);
            // var config = builder.Configuration.Get()

            app.Run();

        }


        private static void AddServices(WebApplicationBuilder builder)
        {
            var connectionString = builder.Configuration.GetConnectionString("FCIS") ??
                            throw new InvalidOperationException("Connection string 'FCIS' not found.");

            // var authServerUrl = builder.Configuration["AuthServerUrl"].TrimEnd('/');

            // string migrationsAssembly = typeof(Program).GetTypeInfo().Assembly.GetName().Name; //Quick_Application1

            // builder.Services.AddDbContext<ApplicationDbContext>(options =>
            //     options.UseSqlServer(connectionString, b => b.MigrationsAssembly(migrationsAssembly)));

            // add identity
            // builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
            //     .AddEntityFrameworkStores<ApplicationDbContext>()
            //     .AddDefaultTokenProviders();

            // Configure Identity options and password complexity here
            builder.Services.Configure<IdentityOptions>(options =>
            {
                // User settings
                options.User.RequireUniqueEmail = true;

                //// Password settings
                //options.Password.RequireDigit = true;
                //options.Password.RequiredLength = 8;
                //options.Password.RequireNonAlphanumeric = false;
                //options.Password.RequireUppercase = true;
                //options.Password.RequireLowercase = false;

                //// Lockout settings
                //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                //options.Lockout.MaxFailedAccessAttempts = 10;
            });

            builder.Services.AddHttpClient();

            // Adds IdentityServer.
            // builder.Services.AddIdentityServer(o =>
            // {
            //     o.IssuerUri = authServerUrl;
            // })
            //   // The AddDeveloperSigningCredential extension creates temporary key material for signing tokens.
            //   // This might be useful to get started, but needs to be replaced by some persistent key material for production scenarios.
            //   // See http://docs.identityserver.io/en/release/topics/crypto.html#refcrypto for more information.
            //   .AddDeveloperSigningCredential()
            //   .AddInMemoryPersistedGrants()
            //   // To configure IdentityServer to use EntityFramework (EF) as the storage mechanism for configuration data (rather than using the in-memory implementations),
            //   // see https://identityserver4.readthedocs.io/en/release/quickstarts/8_entity_framework.html
            //   .AddInMemoryIdentityResources(IdentityServerConfig.GetIdentityResources())
            //   .AddInMemoryApiScopes(IdentityServerConfig.GetApiScopes())
            //   .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
            //   .AddInMemoryClients(IdentityServerConfig.GetClients())
            //   .AddAspNetIdentity<ApplicationUser>()
            //   .AddProfileService<ProfileService>();

            // builder.Services.AddAuthentication(o =>
            // {
            //     o.DefaultScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
            //     o.DefaultAuthenticateScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
            //     o.DefaultChallengeScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
            // })
            //    .AddIdentityServerAuthentication(options =>
            //    {
            //        options.Authority = authServerUrl;
            //        options.RequireHttpsMetadata = false; // Note: Set to true in production
            //        options.ApiName = IdentityServerConfig.ApiName;
            //    });

            // builder.Services.AddAuthorization(options =>
            // {
            //     options.AddPolicy(Authorization.Policies.ViewAllUsersPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ViewUsers));
            //     options.AddPolicy(Authorization.Policies.ManageAllUsersPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ManageUsers));

            //     options.AddPolicy(Authorization.Policies.ViewAllRolesPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ViewRoles));
            //     options.AddPolicy(Authorization.Policies.ViewRoleByRoleNamePolicy, policy => policy.Requirements.Add(new ViewRoleAuthorizationRequirement()));
            //     options.AddPolicy(Authorization.Policies.ManageAllRolesPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ManageRoles));

            //     options.AddPolicy(Authorization.Policies.AssignAllowedRolesPolicy, policy => policy.Requirements.Add(new AssignRolesAuthorizationRequirement()));
            // });

            // Add cors.
            builder.Services.AddCors();

            builder.Services.AddControllersWithViews().AddJsonOptions(options =>
    options.JsonSerializerOptions.ReferenceHandler =
         System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

            builder.Services.AddDbContext<FCISPortalContext>(options =>



  options.UseInMemoryDatabase(databaseName: "FCISInMem"));
  // options.UseSqlServer(builder.Configuration.GetConnectionString("FCIS")));



            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FCISAPI", Version = "v1" });
                //c.OperationFilter<AuthorizeCheckOperationFilter>();
                // c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                // {
                //     Type = SecuritySchemeType.OAuth2,
                //     Flows = new OpenApiOAuthFlows
                //     {
                //         Password = new OpenApiOAuthFlow
                //         {
                //             TokenUrl = new Uri("/connect/token", UriKind.Relative),
                //             Scopes = new Dictionary<string, string>()
                //             {
                //                 { IdentityServerConfig.ApiName, IdentityServerConfig.ApiFriendlyName }
                //             }
                //         }
                //     }
                // });
            });

            builder.Services.AddAutoMapper(typeof(Program));

            // Configurations
            builder.Services.Configure<AppSettings>(builder.Configuration);

            // Business Services
            //builder.Services.AddScoped<IEmailSender, EmailSender>();
            builder.Services.AddScoped<IPIDataService, PIDataService>();
            builder.Services.AddScoped<ISvgDataService, SvgDataService>();

            // Repositories
            // builder.Services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
            // builder.Services.AddScoped<IAccountManager, AccountManager>();

            // Auth Handlers
            // builder.Services.AddSingleton<IAuthorizationHandler, ViewUserAuthorizationHandler>();
            // builder.Services.AddSingleton<IAuthorizationHandler, ManageUserAuthorizationHandler>();
            // builder.Services.AddSingleton<IAuthorizationHandler, ViewRoleAuthorizationHandler>();
            // builder.Services.AddSingleton<IAuthorizationHandler, AssignRolesAuthorizationHandler>();

            // DB Creation and Seeding
            //builder.Services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();

            //File Logger
            //builder.Logging.AddFile(builder.Configuration.GetSection("Logging"));

            //Email Templates
            //EmailTemplates.Initialize(builder.Environment);
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
                // c.OAuthClientId(IdentityServerConfig.SwaggerClientID);
                // c.OAuthClientSecret("no_password"); //Leaving it blank doesn't work
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
        }

        private static void SeedRoomData(string seedDataFolder, FCISPortalContext context, ILogger<Program> logger) {
            try {
                if(context.Rooms.Any()) {return;}

                var roomJsonPath = Path.Combine(seedDataFolder,"room.json");
                var roomJson = File.ReadAllText(roomJsonPath);
                var jsonNodeRooms = JsonSerializer.Deserialize<JsonNode[]>(roomJson)!;
                foreach(var r in jsonNodeRooms){ r["RoomId"] = null; }
                var rooms = jsonNodeRooms.Select(x=>x.Deserialize<Room>()).ToList();
                context.Rooms.AddRange(rooms);
                context.SaveChanges();
            }
            catch(Exception ex){
                logger.LogError(ex, "Error seeding Room table");
            }

        }
        private static void SeedSvgMapData(string seedDataFolder, FCISPortalContext context, ILogger<Program> logger)
        {
            try
            {
                var svgDataService = new SvgDataService(seedDataFolder);

                if (context.SvgMaps.Any() || context.SvgMapPins.Any() || context.SvgMapArrows.Any()) { return; }

                var svgMaps = new List<SvgMap> {
                    new SvgMap {
                        FacilityId=0,
                        Name="apf_facility_all",
                        Viewbox="0 0 7613 11828.3",
                        SvgMapPins = svgDataService.GetMapPins("facilities_all.svg")
                    },
                    new SvgMap {
                        FacilityId=1,
                        Name="PET_B1",
                        Viewbox="0 0 397.31 231.83",
                        SvgMapPins = svgDataService.GetMapPins("FID1_Pins.svg")
                    },
                    new SvgMap {
                        FacilityId=2,
                        Name="PET_B3",
                        Viewbox="0 0 612 615.23",
                        SvgMapPins = svgDataService.GetMapPins("FID2_Pins.svg")
                    },
                    new SvgMap {
                        FacilityId=3,
                        Name="2J",
                        Viewbox="0 0 612 310.6",
                        SvgMapPins = svgDataService.GetMapPins("FID3_Pins.svg"),
                        SvgMapArrows = svgDataService.GetMapArrows("FID3_Arrows.svg")
                    },
                    new SvgMap {
                        FacilityId=5,
                        Name="CC-CCE East Terrace Modular (T10B)",
                        Viewbox="0 0 792 612",
                        SvgMapPins = svgDataService.GetMapPins("FID5_Pins.svg"),
                        SvgMapArrows = svgDataService.GetMapArrows("FID5_Arrows.svg")
                    },
                    new SvgMap {
                        FacilityId=6,
                        Name="DLM_Sterility",
                        Viewbox="0 0 792 356.49",
                        SvgMapPins = svgDataService.GetMapPins("FID6_Pins.svg"),
                        SvgMapArrows = svgDataService.GetMapArrows("FID6_Arrows.svg")
                    },
                    new SvgMap {
                        FacilityId=10,
                        Name="1B42",
                        Viewbox="0 0 369.7 328.9",
                        SvgMapPins = svgDataService.GetMapPins("FID10_Pins.svg"),
                        SvgMapArrows = svgDataService.GetMapArrows("FID10_Arrows.svg")
                    },
                    new SvgMap {
                        FacilityId=11,
                        Name="T30",
                        Viewbox="0 0 792 612",
                        SvgMapPins = svgDataService.GetMapPins("FID11_Pins.svg"),
                        SvgMapArrows = svgDataService.GetMapArrows("FID11_Arrows.svg")
                    },
                    new SvgMap {
                        FacilityId=12,
                        Name="T1and2",
                        Viewbox="0 0 612.66 326.07",
                        SvgMapPins = svgDataService.GetMapPins("FID12_Pins.svg"),
                        SvgMapArrows = svgDataService.GetMapArrows("FID12_Arrows.svg")
                    },
                    new SvgMap {
                        FacilityId=13,
                        Name="T1and2",
                        Viewbox="0 0 612.66 326.07",
                        SvgMapPins = svgDataService.GetMapPins("FID13_Pins.svg")
                    },
                    new SvgMap {
                        FacilityId=17,
                        Name="CC PHAR I-IVAU Expansion",
                        Viewbox="0 0 612.98 590",
                        SvgMapPins = svgDataService.GetMapPins("FID17_Pins.svg"),
                        SvgMapArrows = svgDataService.GetMapArrows("FID17_Arrows.svg")
                    },
                    new SvgMap {
                        FacilityId=19,
                        Name="NCI-HPP",
                        Viewbox="0 0 792 612",
                        SvgMapPins = svgDataService.GetMapPins("FID19_Pins.svg"),
                        SvgMapArrows = svgDataService.GetMapArrows("FID19_Arrows.svg")
                    },
                };

                context.SvgMaps.AddRange(svgMaps);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error Seeding SvgMap, SvgPin, and SvgArrow tables"); 
            }
        }

        private static void SeedDatabase(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var seedDataFolder = app.Configuration.GetSection("seedDataFolder").Value;
                var logger = services.GetRequiredService<ILogger<Program>>();
                var context = services.GetRequiredService<FCISPortalContext>();

                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                // SeedRoomData(seedDataFolder, context, logger);
               // SeedSvgMapData(seedDataFolder, context, logger);
            }
        }
    }
}
