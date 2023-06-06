## VS Code
cd FCISUI
dotnet build
dotnet run

click first link shown in terminal ex 
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7061


https://localhost:44420/swagger/index.html

dotnet publish -c Debug -r win-x64 -o w:/FCISV2 //p:EnvironmentName=Development
dotnet publish -c production -o w:/FCISV2
(// in front of p:EnvironmentName=Development might be a git bash thing might only need one / in powershell)

dotnet build
dotnet run --environment=local

Client Side:
      Node 18,
      Angular 14
      Settings: ClientApp/src/environments/environment.<someenv>.ts

Server Side:
      .Net Core 6
      Settings: AppSettings.json
      pi api url: http://orfd-cogen.ors.nih.gov/pi-api

Database:
      Sql Server
      DB Conn: Data Source=ORF-02204227\\SQLEXPRESS;Initial Catalog=FCISPortal514;Integrated Security=SSPI;

Repo: 
      https://tfs.ors.od.nih.gov/tfs/EXT/DTR/_git/FCISPortal2


