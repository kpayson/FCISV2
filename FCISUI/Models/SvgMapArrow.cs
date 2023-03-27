using System.ComponentModel.DataAnnotations.Schema;
namespace FCISUI.Models
{
    public partial class SvgMapArrow
    {
        public int? Id { get; set; }
        public string LocationId { get; set; }
        public string ArrowOutlinePoints { get; set; }
        public string ArrowInsidePoints { get; set; }

        [ForeignKey("SvgMap")]
        public int SvgMapId { get; set; }
        public virtual SvgMap SvgMap {get; set;}
    }
}
