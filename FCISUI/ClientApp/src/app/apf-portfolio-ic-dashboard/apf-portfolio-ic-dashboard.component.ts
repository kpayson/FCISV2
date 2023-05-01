import {} from './apf-portfolio-ic-dashboard.service';

import {
  ApfPortfolioIcDashboardService,
  TimelineChartData,
  locationStatusLookup
} from './apf-portfolio-ic-dashboard.service';
import { Observable, filter, map } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PiDataFilter } from './apf-portfolio-ic-dashboard.service';
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

    this.activatedRoute.params
      .pipe(
        filter(Boolean),
        map((p) => p.ic?.toLowerCase() || '')
      )
      .subscribe((ic) => {
        this.service.setIC(ic);
      });

    this.svgMap$ = this.service.svgMap$;
    this.svgBackgroundImageUrl$ = this.service.svgMapBackgroundImageUrl$;
    this.pinStates$ = this.service.pinStates$;
    this.hoveredPin$ = this.service.hoveredPin$;
    this.hoveredTimelineLabel$ = this.service.hoveredTimelineLabel$;
    this.timelineChartData$ = this.service.timelineChartData$;
    this.selectedRoomInfo$ = this.service.selectedRoomInfo$;
    this.isFacilityAll$ = this.service.isFacilityAll$;
    this.selectedAttributeStatus$ = this.service.piDataFilter$.pipe(
      map((x) => x.status)
    );
    this.hasSelectedRoom$ = this.selectedRoomInfo$.pipe(
      map((x) => Object.keys(x).length > 0)
    );
    this.facilityFilterOptions$ = this.service.facilityFilterOptions$;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.service.filterPiData({
      facility: { value: 0, repName: '', sectionName: '' },
      interval: 30,
      status: 'Sum All',
      startDate: new Date(),
      endDate: yesterday
    });

    this.timelineChartData$.subscribe(()=>{
      this.isLoading = false;
    });

    service.piDataFilter$.subscribe((x)=>{
      this.filterParams = {
        facility: x.facility.repName || 'All Facility',
        startDate: `${x.startDate.getMonth() + 1}/${x.startDate.getDate()}/${x.startDate.getFullYear()}`,
        endDate: `${x.endDate.getMonth() + 1}/${x.endDate.getDate()}/${x.endDate.getFullYear()}`,
        status: x.status === 'Sum All' ? 'Composite' :  x.status === 'DP' ? 'dP' : x.status,
        interval: x.interval        
      }

    })
  }

  monitoredRoomsChartData$: Observable<any[]>;
  facilityFilterOptions$: Observable<
    { repName: string; sectionName: string; value: string }[]
  >;
  timelineChartData$: Observable<TimelineChartData>;
  svgMap$: Observable<SvgMap>;
  svgBackgroundImageUrl$: Observable<string>;
  pinStates$: Observable<locationStatusLookup>;
  defaultSvgMap: SvgMap = {
    backgroundSvg: '',
    id: 0,
    name: '',
    svgMapPins: [],
    svgMapArrows: [],
    viewbox: '',
    defs: '',
    facilityId: 0
  };
  hoveredPin$: Observable<string>;
  hoveredTimelineLabel$: Observable<string>;
  selectedRoomInfo$: Observable<{ [field: string]: string }>;

  isFacilityAll$: Observable<boolean>;
  selectedAttributeStatus$: Observable<string>;

  hasSelectedRoom$: Observable<boolean>;

  filterParams: any = {
    facility:'',
    startDate:'',
    endDate:'',
    status:'',
    interval:''
  };

  filterChange($event: any) {
    this.isLoading = true;
    setTimeout(() => {
      this.service.filterPiData($event);
    }, 0);
  }

  isLoading=false;

  showFilterToolbar=false;

  showMapKey=false;


  chartLabelClick($event: any) {
    // console.log($event);
  }

  chartLabelMouseOver($event: any) {
    this.service.setHoveredTimelineLabel($event);
  }

  chartLabelMouseOut($event: any) {
    this.service.setHoveredTimelineLabel('');
  }

  pinClick($event: any) {
    this.service.setSelectedPin($event);
    // console.log($event);
  }

  pinMouseOver($event: any) {
    this.service.setHoveredPin($event);
  }

  pinMouseOut($event: any) {
    this.service.setHoveredPin('');
  }

}
