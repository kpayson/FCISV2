## Dev Notes
<pre>
  dotnet aspnet-codegenerator controller \
    -name FacilitiesController \
    -api \
    -async \
    -m FCISUI.Models.Facility \
    -dc FCISContext \
    -namespace FCISUI.Controllers \
    -outDir Controllers
</pre>

<pre>
git remote add origin https://tfs.ors.od.nih.gov/tfs/EXT/DTR/_git/FCISClean
git push -u origin --all
</pre>

https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-6.0&tabs=windows

https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view=aspnetcore-6.0&tabs=visual-studio

dotnet ef dbcontext scaffold "Data Source=NCATS-2170893-P\\SQLEXPRESS;Initial Catalog=FCISPortal;Integrated Security=SSPI;" Microsoft.EntityFrameworkCore.SqlServer -o Models --force 

https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-7.0&tabs=visual-studio-code


dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet-aspnet-codegenerator controller -name GsfGrowthController -async -api -m Gsfgrowth -dc FCISPortalContext -outDir Controllers


dotnet add package NSwag.ASpNetCore

https://www.ebenmonney.com/quickapp-asp-net-core-angular-startup-project-template/

var buildUrl =  () => { 
  var startDate = new Date(); 
  startDate.setDate(startDate.getDate()-1); 
  endDate = new Date(); 
  var url = `https://orfd-cogen.ors.nih.gov/pi-api/time-series?tag=\\\\ORF-COGENAF\\cGMP\\cGMP\\PET_1|Facility_Status_Check&start_time=${startDate.toISOString()}&end_time=${endDate.toISOString()}&rectype=interpolated&interval=10m`; 
  console.log(url); 
}


http://orfd-cogen.ors.nih.gov/pi-api/time-series?tag=\\ORF-COGENAF\cGMP\cGMP\PET_1|Facility_Status_Check&start_time=2023-02-15T21:17:44&end_time=2023-02-16T21:17:44&rectype=interpolated&interval=10m


http://orfd-cogen.ors.nih.gov/pi-api/current-value?tag=\\\\ORF-COGENAF\\Dev_cGMP\\cGMP/PET_1|Facility_Status_Check
http://orfd-cogen.ors.nih.gov/pi-api/current-value?tag=\\ORF-COGENAF\Dev_cGMP\cGMP/PET_1|Facility_Status_Check

http://orfd-cogen.ors.nih.gov/pi-api/time-series?tag=\\ORF-COGENAF\cGMP\cGMP\PET_1|Facility_Status_Check&start_time=2023-02-16T21:19:10&end_time=2023-02-17T21:19:10&rectype=interpolated&interval=10m

Private properties.
Data binding properties.
View and content properties.
UI properties.
Component API properties.
Constructor.
Lifecycle hooks.
Event handlers.
Component API methods.
Private methods.

http://orfd-cogen.ors.nih.gov/pi-api/current-value?tag=\\ORF-COGENAF\Dev_cGMP\cGMP/PET_1|Facility_Status_Check

 https://orfd-cogen.ors.nih.gov/pi-api/table-values?path=\\ORF-COGENAF\cGMP\APF_Limits

 http://orfd-cogen.ors.nih.gov/pi-api/time-series-batch
 "{\"tags\":[\"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\Pet_1\\\\1C482-1 |Status\",\"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\Pet_1\\\\1C482-2 |Status\"],\"start_time\":\"2023-03-26T01:45:04.375Z\",\"end_time\":\"2023-03-27T01:45:04.375Z\",\"interval\":10,\"rectype\":\"\"}"

 https://orfd-cogen.ors.nih.gov/pi-api/time-series?tag=\\\\ORF-COGENAF\\cGMP\\cGMP\\E_TER\\1CM100A\\1CM100_DP|DP|Status&start_time=2023-03-26T03:08:05&end_time=2023-03-27T03:08:05&rectype=interpolated&interval=60m

Query to JSON ex
SELECT [RoomId]
      ,[FacilityId]
      ,[Facility]
      ,[RoomNumber]
      ,[SQ]
      ,[RoomName]
      ,[ISO]
  FROM [FCISPortal].[dbo].[Room]
      FOR JSON PATH, 
        INCLUDE_NULL_VALUES