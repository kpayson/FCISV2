using System;
using System.Linq;
using FCISUI.Data;
using FCISUI.Models;

namespace ContosoUniversity.Data
{
    public static class DbInitializer
    {
        public static void Initialize(FCISPortalContext context)
        {
            context.Database.EnsureCreated();
            //var service = new SvgDataService()
        }
    }
}