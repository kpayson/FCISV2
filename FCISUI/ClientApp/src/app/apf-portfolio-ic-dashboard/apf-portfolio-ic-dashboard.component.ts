import { ApfPortfolioIcDashboardService, locationStatusLookup } from './apf-portfolio-ic-dashboard.service';
import { Observable, map, mergeMap, of } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { SvgMap } from '../api/models';

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

    this.svgMap$ = this.service.svgMap$;
    this.svgBackgroundImageUrl$ = this.service.svgMapBackgroundImageUrl$;
    this.pinStates$ = this.service.currentStatusValues$

    this.timelineData$ = this.service.timeline$.pipe(map(points=>{
      return points.map(x=>{
        return [
          {
            v: x.locationName,
            p: {
                link: `https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=${x.tag}`
            }
          },
          "", //createCustomHTMLContentTable(x.RoomNumber, x.RoomName, x.ISO, x.SQ)
          x.chillerStatusLabel,
          x.statusColor,
          x.startDate,
          x.endDate
        ]
      })
    }));

  }

  monitoredRoomsChartData$: Observable<any[]>;
  facilityFilterOptions$: Observable<{name:string,value:string}[]>;
  timelineData$: Observable<any[]>;
  svgMap$:Observable<SvgMap>;
  svgBackgroundImageUrl$:Observable<string>;
  pinStates$:Observable<locationStatusLookup>;

  defaultSvgMap:SvgMap = {backgroundSvg:"",id:0,name:"",svgMapPins:[],viewbox:"",defs:"", facilityId:0}


  filterChange($event:any) {
    setTimeout(()=>{this.service.filterPiData($event)},0);
  }

  chartLabelClick($event:any) {
    console.log($event);
  }

  pinClick($event:any){
    console.log($event);
  }

  pinHover($event:any){
    console.log($event);
  }

  staticContentSave(evnt:any) {
    
  }

}
