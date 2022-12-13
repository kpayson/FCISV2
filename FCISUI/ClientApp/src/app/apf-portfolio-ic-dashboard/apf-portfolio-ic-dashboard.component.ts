import { Component } from '@angular/core';
import { ActivatedRoute, Route, Params } from '@angular/router';
import { ApfPortfolioIcDashboardService } from './apf-portfolio-ic-dashboard.service';
import { Observable,of,map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-apf-portfolio-ic-dashboard',
  templateUrl: './apf-portfolio-ic-dashboard.component.html',
  styleUrls: ['./apf-portfolio-ic-dashboard.component.scss'],
  providers: [ApfPortfolioIcDashboardService]
})
export class ApfPortfolioIcDashboardComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    public service: ApfPortfolioIcDashboardService
  ) {
    this.monitoredRoomsChartData$ = this.service.gsfGrowthByClassification$;

    this.facilityFilterOptions$ = this.activatedRoute.params.pipe(mergeMap(params =>{
      const ic = params.ic?.toLowerCase() || '';
      return this.service.facilityFilterOptions(ic)
    }))

    
    
    //.snapshot.paramMap;
    //const ic = routeParams.get('ic')?.toLowerCase() || '';

    //this.facilityFilterOptions$ = this.service.facilityFilterOptions(ic);
    //this.timelineData$ = this.service.timeline$;

    const statusColor = (statusVal:number) => {
      switch(statusVal){
        case 0:
          return "green";
        case 1: 
          return "gray";
        case 2:
           return "yellow";
        case 3:
            return "red";
        default:
          return "white";
      }
    }

    const chillerStatusLabel = (statusVal:number) => {
      switch(statusVal){
        case 0:
          return "Within Spec";
        case 1: 
          return "Comm Loss";
        case 2:
           return "Warning";
        case 3:
            return "Alarm (our of Spec)";
        default:
            return "";
      }
    }

    const createCustomHTMLContentTable = (roomNumber:string, roomName:string, iso:string, sq:string) => {
      return `
      <div align="left" style="max-width: 300px; padding:5px 5px 5px 5px;">
        <table>
          <tr><th>Room: ${roomName} </th></tr>
          <tr><td><b>Room #: ${roomNumber} </b></td> </tr>
          <tr><td><b>Class:  ${iso} </b></td> </tr> 
          <tr><td><b>GSF:  ${sq} + </b></td> </tr> 
        </table>
      </div>`;
    }


    // const dummyJSON = '[{"RoomName":"CC PET Radiopharmacy","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\PET_1|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000},{"RoomName":"CC B3 PET Radiochemistry","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\PET_B3|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000},{"RoomName":"CC CCE 2J Cell Therapy Lab","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\2J|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000},{"RoomName":"CC-CCE East Terrace Modular (T10B)","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Alarm (Out of Spec)","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\E_TER|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000},{"RoomName":"CC DLM Sterility","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\DLM_SL\\r\\n|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000},{"RoomName":"CC PHAR I-IVAU Expansion","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\IIVAU|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000},{"RoomName":"NCI 1B42","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\VVF|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670511420000},{"RoomName":"NCI 1B42","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Warning","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\VVF|Facility_Status_Check","StartTime":1670511420000,"EndTime":1670512620000},{"RoomName":"NCI 1B42","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Alarm (Out of Spec)","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\VVF|Facility_Status_Check","StartTime":1670512620000,"EndTime":1670513820000},{"RoomName":"NCI 1B42","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\VVF|Facility_Status_Check","StartTime":1670513820000,"EndTime":1670550420000},{"RoomName":"NCI TIL Modular (T30)","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\T30|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000},{"RoomName":"NCI Trailer 1 (10B)","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\Tr1|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000},{"RoomName":"NCI Trailer 2 (10A)","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\Tr2|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000},{"RoomName":"NCI Hyperpolarized C-13 Facility ","RoomNumber":"","SQ":"","ISO":"","ChillerStatus":"Within Spec","Color":"","Tag":"\\\\\\\\ORF-COGENAF\\\\cGMP\\\\cGMP\\\\HPP\\r\\n|Facility_Status_Check","StartTime":1670464020000,"EndTime":1670550420000}]';
    // const dummyData = JSON.parse(dummyJSON)as any[];
    // const dummyData2 = dummyData.map(x=> {
    // const tooltipText = createCustomHTMLContentTable(x.RoomNumber, x.RoomName, x.ISO, x.SQ)
      
    //   const row = 
    //     [
    //       {
    //         v: x.RoomName,
    //         p: {
    //             link: `https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=${x.Tag}`  // This will need to be the correct concantonated link: dataValues[i].Tag + ...
    //         }
    //       },
    //       tooltipText,
    //       x.ChillerStatus,
    //       statusColor(x.ChillerStatus),
    //       new Date(x.StartTime),
    //       new Date(x.EndTime)
    //     ];
    //   return row;
      
    // });


    //of(dummyData2);
    this.timelineData$ = this.service.timeline$.pipe(map(points=>{
      return points.map(x=>{
        return [
          {
            v: x.locationName,
            p: {
                link: `https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=${x.tag}`  // This will need to be the correct concantonated link: dataValues[i].Tag + ...
            }
          },
          "", //createCustomHTMLContentTable(x.RoomNumber, x.RoomName, x.ISO, x.SQ)
          chillerStatusLabel(x.statusValue),
          statusColor(x.statusValue),
          new Date(x.startTime),
          new Date(x.endTime)
        ]
      })
    }))
  }

  monitoredRoomsChartData$: Observable<any[]>;
  facilityFilterOptions$: Observable<{name:string,value:string}[]>;
  timelineData$: Observable<any[]>;

  filterChange($event:any) {
    this.service.filterPiData($event)
  }

  chartLabelClick($event:any) {
    console.log($event);
  }

}
