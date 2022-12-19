
using CommandLine;
using System.Xml.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;


internal class Program
{
    public class Options
    {
        [Option('m', "map", Required = true, HelpText = "map name")]
        public string MapName { get; set; }

        [Option('p', "path", Required = true, HelpText = "base file path")]
        public string BasePath { get; set; }
    }

    public class PinData
    {
        public int SvgMapId { get; set; }
        public string LocationId { get; set; }
        public string Title { get; set; }
        public double Cx { get; set; }
        public double Cy { get; set; }
        public double R { get; set; }
        public string Path { get; set; }
    }

    public class DataService
    {
        private string _connString;
        public DataService(string connString)
        {
            this._connString = connString;
        }

        public int AddSvgMap(string name, string viewBox, string backgroundImg)
        {
            using (SqlConnection connection = new SqlConnection(this._connString))
            {
                connection.Open();
                string sql = "INSERT INTO SvgMap(Name, BackgroundSvg, Viewbox) output INSERTED.ID VALUES(@param1, @param2, @param3)";
                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    cmd.Parameters.Add("@param1", SqlDbType.VarChar).Value = name;
                    cmd.Parameters.Add("@param2", SqlDbType.Text).Value = backgroundImg;
                    cmd.Parameters.Add("@param3", SqlDbType.VarChar).Value = viewBox;
                    cmd.CommandType = CommandType.Text;
                    var res = cmd.ExecuteScalar();
                    int id = (int)res;
                    return id;
                }
            }
        }

        public void AddSvgPins(List<PinData> pinData)
        {
            using (SqlConnection connection = new SqlConnection(this._connString))
            {
                connection.Open();
                string sql = "INSERT INTO SvgMapPin(SvgMapId, LocationId, Title, Cx, Cy, R, Path) VALUES(@param1, @param2, @param3, @param4, @param5, @param6, @param7)";
                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    foreach (var pin in pinData)
                    {
                        cmd.Parameters.Add("@param1", SqlDbType.Int).Value = pin.SvgMapId;
                        cmd.Parameters.Add("@param2", SqlDbType.VarChar).Value = pin.LocationId;
                        cmd.Parameters.Add("@param3", SqlDbType.VarChar).Value = pin.Title;
                        cmd.Parameters.Add("@param4", SqlDbType.Float).Value = pin.Cx;
                        cmd.Parameters.Add("@param5", SqlDbType.Float).Value = pin.Cy;
                        cmd.Parameters.Add("@param6", SqlDbType.Float).Value = pin.R;
                        cmd.Parameters.Add("@param7", SqlDbType.VarChar).Value = pin.Path;
                        cmd.CommandType = CommandType.Text;
                        try
                        {
                            cmd.ExecuteNonQuery();
                            cmd.Parameters.Clear();
                        }
                        catch(Exception ex)
                        {
                            Console.WriteLine(ex);
                        }

                    }
                }
            }
        }
    }

    static void Main(string[] args)
    {
        //ex -m apf_facility_all -p C:\code\NIHRepos\FCISPortal2\FCISTools\svg

        Parser.Default.ParseArguments<Options>(args)
               .WithParsed<Options>(o =>
               {
                   var connString = ConfigurationManager.ConnectionStrings["FCIS"].ConnectionString;
                   var dataService = new DataService(connString);
                   var backgroundSvg = XDocument.Load(Path.Combine(o.BasePath, o.MapName + ".background.svg"));
                   var viewBox = backgroundSvg.Root!.Attribute("viewBox")!.Value;
                   var backgroundSvgContent = string.Join('\n', backgroundSvg.Root.Elements());
                   var kids = backgroundSvg.Root.ElementsAfterSelf().ToList().ToString();
                   var pinsSvg = XDocument.Load(Path.Combine(o.BasePath, o.MapName + ".pins.svg"));
                   //byte[] backgroundSvgBytes = Encoding.ASCII.GetBytes(backgroundSvg.ToString());
                   var mapId = dataService.AddSvgMap(o.MapName, viewBox, backgroundSvgContent);

                   XNamespace ns = "http://www.w3.org/2000/svg";
                   IEnumerable<XElement> gList = pinsSvg.Root!.Descendants(ns + "g").ToList();

                   var pinData = gList.Select(g =>
                   {
                       var anchor = g!.Element(ns + "a");
                       var circle = anchor!.Element(ns + "circle");
                       var path = anchor!.Element(ns + "path");
                       return new PinData
                       {
                           SvgMapId = mapId,
                           LocationId = g.Attribute("id")!.Value,
                           Title = anchor!.Attribute("title")!.Value,
                           Cx = Double.Parse(circle!.Attribute("cx")!.Value),
                           Cy = Double.Parse(circle!.Attribute("cy")!.Value),
                           R = Double.Parse(circle!.Attribute("r")!.Value),
                           Path = path != null ? path!.Attribute("d")!.Value : ""
                       };
                   }).ToList();

                   dataService.AddSvgPins(pinData);
               });
    }
}