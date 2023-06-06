using System;
using System.Collections.Generic;

namespace FCISUI.Models
{
    public partial class Portfolio
    {
        int  PortfolioId {get; set;}
        string PortfolioName {get; set;}
        string IC {get;set;}

        string RootPortfolio {get;set;}
    }
}