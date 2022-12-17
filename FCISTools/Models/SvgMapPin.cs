using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCISTools.Models
{
    partial class SvgMapPin
    {
        public int Id { get; set; }
        public int SvgMapId { get; set; }
        public string LocationId { get; set; }
        public string Title { get; set; }
        public double Cx { get; set; }
        public double Cy { get; set; }
    }

}
