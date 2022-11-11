using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using FCISUI.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Data Source=NCATS-2170893-P\SQLEXPRESS;Initial Catalog=FCISPortal

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<FCISContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("FCIS")));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
};

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

//app.MapRoomEndpoints();



app.Run();

