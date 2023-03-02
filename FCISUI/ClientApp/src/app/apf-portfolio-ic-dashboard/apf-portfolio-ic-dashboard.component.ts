import { ApfPortfolioIcDashboardService, RoomDisplayField, TimelineChartData, locationStatusLookup } from './apf-portfolio-ic-dashboard.service';
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


    this.svgMap$ = this.service.svgMap$;
    this.svgBackgroundImageUrl$ = this.service.svgMapBackgroundImageUrl$;
    this.pinStates$ = this.service.currentStatusValues$;
    this.hoveredPin$ = this.service.hoveredPin$;
    this.hoveredTimelineLabel$ = this.service.hoveredTimelineLabel$;
    this.timelineChartData$ = this.service.timelineChartData$;
    this.selectedRoomInfo$ = this.service.selectedRoomInfo$;
    this.isFacilityAll$ = this.service.isFacilityAll$;

  }

  monitoredRoomsChartData$: Observable<any[]>;
  facilityFilterOptions$: Observable<{name:string,value:string}[]>;
  timelineChartData$: Observable<TimelineChartData>;
  svgMap$:Observable<SvgMap>;
  svgBackgroundImageUrl$:Observable<string>;
  pinStates$:Observable<locationStatusLookup>;
  defaultSvgMap:SvgMap = {backgroundSvg:"",id:0,name:"",svgMapPins:[],viewbox:"",defs:"", facilityId:0}
  hoveredPin$:Observable<string>;
  hoveredTimelineLabel$: Observable<string>;
  selectedRoomInfo$: Observable<RoomDisplayField[]>
  isFacilityAll$: Observable<boolean>
;
  filterChange($event:any) {
    setTimeout(()=>{this.service.filterPiData($event)},0);
  }

  chartLabelClick($event:any) {
    console.log($event);
  }

  chartLabelMouseOver($event:any) {
    this.service.setHoveredTimelineLabel($event);
  }

  chartLabelMouseOut($event:any) {
    this.service.setHoveredTimelineLabel('');
  }

  pinClick($event:any){
    this.service.setSelectedPin($event);
    console.log($event);
  }

  pinMouseOver($event:any){
    this.service.setHoveredPin($event);
  }

  pinMouseOut($event:any){
    this.service.setHoveredPin('');
  }

}
