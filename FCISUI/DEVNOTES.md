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