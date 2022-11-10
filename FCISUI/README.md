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