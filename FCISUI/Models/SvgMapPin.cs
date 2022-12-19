using System.ComponentModel.DataAnnotations.Schema;
namespace FCISUI.Models
{
    public partial class SvgMapPin
    {
        public int Id { get; set; }
        public string LocationId { get; set; }
        public string Title { get; set; }
        public double Cx { get; set; }
        public double Cy { get; set; }
        public double R { get; set; }
        public string Path {get; set;}
        
        [ForeignKey("SvgMap")]
        public int SvgMapId { get; set; }
        public virtual SvgMap SvgMap {get; set;}
    }
}
