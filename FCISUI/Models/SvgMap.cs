namespace FCISUI.Models
{
    public partial class SvgMap
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BackgroundSvg { get; set; }
        public string Viewbox { get; set; }

        public virtual ICollection<SvgMapPin> SvgMapPins {get; set;}
    }
}
