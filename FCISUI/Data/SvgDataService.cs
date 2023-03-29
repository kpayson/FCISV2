using FCISUI.ViewModels;
using System.Net.Http;
using System.Configuration;
using System.Text.Json;
using FCISUI.Models;
using System.Xml.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;


namespace FCISUI.Data
{
    public interface ISvgDataService {
        public List<SvgMapArrow> GetMapArrows(string arrowsFileName, int MapId);
        public List<SvgMapPin> GetMapPins(string pinsFileName, int svgMapId);
    }

    class SvgDataService : ISvgDataService
    {
        private readonly string dataFolderPath;
        public SvgDataService(IConfiguration config) {
            this.dataFolderPath = config.GetValue<string>("seedDataFolder");
        }
        public List<SvgMapArrow> GetMapArrows(string arrowsFileName, int svgMapId) {

            
            // <svg xmlns="http://www.w3.org/2000/svg">
            //     <g id="dPArrowsFID5">
            //         <g id="pin1CM100B_1CM100_DP">
            //             <polygon id="pinBack1CM100B_1CM100_DP" class="stGray" points="152.15 304.26 170.23 ..." />
            //             <polygon id="pinColor1CM100B_1CM100_DP" class="stWhite" points="155.47 304.25 167.91 ..." />
            //         </g>

            var file = Path.Combine(dataFolderPath, arrowsFileName);

            if( !File.Exists(file)) { return new List<SvgMapArrow>(); }

            try {
                var arrowsSvg = XDocument.Load(Path.Combine(dataFolderPath, arrowsFileName));
                // var namePtrn = new Regex(@"^pin([A-Za-z0-9]+(_\d+)?)_([A-Za-z0-9]+(_\d+)?)_DP");
                XNamespace ns = "http://www.w3.org/2000/svg";
                var root = arrowsSvg.Root!.Element(ns + "g"); // ex <g id="dPArrowsFID5"
                var arrowGroups = root!.Elements(ns + "g");
                var arrows = arrowGroups.Select(ag=>{
                    var id=ag.Attribute("id")!.Value;
                    // var match = namePtrn.Match(id);
                    // var room1 = match.Groups[1].Value;
                    // var room2 = match.Groups[2].Value;
                    var locationId = id.Substring(3);
                    var polygons = ag.Elements(ns + "polygon").ToArray();

                    var outline =polygons.First(p=>p.Attribute("class")!.Value == "stGray");
                    var inside =polygons.First(p=>p.Attribute("class")!.Value == "stWhite");

                    var outlinePoints = outline.Attribute("points")!.Value;
                    var insidePoints = inside.Attribute("points")!.Value;

                    return new SvgMapArrow {
                        SvgMapId = 1,
                        LocationId = locationId, //$"{room1}_{room2}",
                        ArrowInsidePoints = insidePoints,
                        ArrowOutlinePoints = outlinePoints
                    };
                });

                var arrowList = arrows.ToList();

                return arrowList;
            }
            catch(Exception ex) {
                Console.Write(ex);
                return new List<SvgMapArrow>();
            }
        }

        
        public List<SvgMapPin> GetMapPins(string pinsFileName, int svgMapId) {

            // <svg xmlns="http://www.w3.org/2000/svg">                  
            //     <g id="pinsFID1">
            //         <g id="pin1C482_1">
            //             <circle id="pinBack1C482_1" class="stGray" cx="158.86" cy="98.95" r="20" />
            //             <circle id="pinColor1C482_1" class="stWhite" cx="158.86" cy="98.95" r="13.33" />
            //         </g>

            var file = Path.Combine(dataFolderPath, pinsFileName);

            if( !File.Exists(file)) { return new List<SvgMapPin>(); }

            try {
                var pinsSvg = XDocument.Load(Path.Combine(dataFolderPath, pinsFileName));
                XNamespace ns = "http://www.w3.org/2000/svg";
                var root = pinsSvg.Root!.Element(ns + "g"); // ex <g id="pinsFID1"
                var pinGroups = root!.Elements(ns + "g");
                var pins = pinGroups.Select(pg=>{
                    var id=pg.Attribute("id")!.Value;
                    var roomNum = id.Substring(3).Replace('_','-');
                    var circle = pg.Elements(ns+ "circle").Skip(1).FirstOrDefault();
                    if(circle != null) {
                        var cx = circle.Attribute("cx")!.Value;
                        var cy = circle.Attribute("cy")!.Value;
                        var r= circle.Attribute("r")!.Value;

                        return new SvgMapPin {
                            Cx=double.Parse(cx),
                            Cy=double.Parse(cy),
                            LocationId=roomNum,
                            R=double.Parse(r),
                            SvgMapId=svgMapId,
                            Title = roomNum // TODO
                        };
                    }
                    else {
                        var ellipse = pg.Elements(ns+ "ellipse").Skip(1).FirstOrDefault(); 
                        var cx = ellipse.Attribute("cx")!.Value;
                        var cy = ellipse.Attribute("cy")!.Value;
                        var r= ellipse.Attribute("rx")!.Value;
                        
                        return new SvgMapPin {
                            Cx=double.Parse(cx),
                            Cy=double.Parse(cy),
                            LocationId=roomNum,
                            R=double.Parse(r),
                            SvgMapId=svgMapId,
                            Title = roomNum // TODO
                         };
                    }

                });
                var pinList = pins.ToList();
                return pinList;
            }
            catch(Exception ex) {
                return new List<SvgMapPin>(); 
            }
        }
    }
}
