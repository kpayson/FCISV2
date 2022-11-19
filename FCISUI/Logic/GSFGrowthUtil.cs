using FCISUI.ViewModels;

namespace FCISUI.Logic
{
    public static class GSFGrowthUtil
    {
        // public static List<GSFGrowthCumulative> GetCumulativeValues(List<GSFGrowthDelta> deltas)
        // {
        //     deltas.Sort();
        //     var curTotals = new GSFGrowthCumulative
        //     {
        //         CncRoomsArea = 0,
        //         CncRoomsCount = 0,
        //         CriticalEnvironmentPrametersCount = 0,
        //         Iso7RoomsArea = 0,
        //         Iso7RoomsCount = 0,
        //         Iso8RoomsArea = 0,
        //         Iso8RoomsCount = 0,
        //         GoLiveDate = DateTime.MinValue
        //     };

        //     var start = 12 * deltas[0].Year + deltas[0].Month;

        //     var cumulative = new List<GSFGrowthCumulative>();
        //     int currYear = 0;
        //     int currMonth = 0;

        //     foreach (var delta in deltas)
        //     {
        //         curTotals.CncRoomsArea += delta.CncRoomsArea;
        //         curTotals.CncRoomsCount += delta.CncRoomsCount;
        //         curTotals.Iso7RoomsArea += delta.Iso7RoomsArea;
        //         curTotals.Iso7RoomsCount += delta.Iso7RoomsCount;
        //         curTotals.Iso8RoomsArea += delta.Iso8RoomsArea;
        //         curTotals.Iso8RoomsCount += delta.Iso8RoomsCount;
        //         curTotals.CriticalEnvironmentPrametersCount += delta.CriticalEnvironmentPrametersCount;

        //         if (delta.Year != currYear || delta.Month != currMonth)
        //         { //  || delta.Month != currMonth
        //             cumulative.Add(new GSFGrowthCumulative
        //             {
        //                 CncRoomsArea = curTotals.CncRoomsArea,
        //                 CncRoomsCount = curTotals.CncRoomsCount,
        //                 Iso7RoomsArea = curTotals.Iso7RoomsArea,
        //                 Iso7RoomsCount = curTotals.Iso7RoomsCount,
        //                 Iso8RoomsArea = curTotals.Iso8RoomsArea,
        //                 Iso8RoomsCount = curTotals.Iso8RoomsCount,
        //                 CriticalEnvironmentPrametersCount = curTotals.CriticalEnvironmentPrametersCount,
        //                 GoLiveDate = new DateTime(delta.Year, delta.Month, 1)
        //             }); ;
        //         }
        //         else
        //         {
        //             var prev = deltas[deltas.Count - 1];
        //             prev.CncRoomsArea = curTotals.CncRoomsArea;
        //             prev.CncRoomsCount = curTotals.CncRoomsCount;
        //             prev.Iso7RoomsArea = curTotals.Iso7RoomsArea;
        //             prev.Iso7RoomsCount = curTotals.Iso7RoomsCount;
        //             prev.Iso8RoomsArea = curTotals.Iso8RoomsArea;
        //             prev.Iso8RoomsCount = curTotals.Iso8RoomsCount;
        //             prev.CriticalEnvironmentPrametersCount = curTotals.CriticalEnvironmentPrametersCount;
        //         }
        //         currMonth = delta.Month;
        //         currYear = delta.Year;

        //     }
        //     return cumulative;
        // }
    
    }

}
