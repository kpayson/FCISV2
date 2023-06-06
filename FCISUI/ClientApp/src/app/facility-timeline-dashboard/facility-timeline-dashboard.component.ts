import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FacilityTimelineDashboardService,
  PiDataFilter,
  TimelineChartData,
  locationStatusLookup
} from './facility-timeline-dashboard.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { RoomInfoDisplayComponent } from '../room-info-display/room-info-display.component';
import { SvgMap } from '../api/models';

@Component({
  selector: 'app-facility-timeline-dashboard',
  templateUrl: './facility-timeline-dashboard.component.html',
  styleUrls: ['./facility-timeline-dashboard.component.scss'],
  providers: [FacilityTimelineDashboardService]
})
export class FacilityTimelineDashboardComponent implements OnInit {

  @Input()
  facilityId=0;

  @Input()
  facilitySection='';

  @Input()
  portfolioId="";

  @Input()
  facilityOrPortfolio="facility"

  @Input()
  set dashboardId(v: string) {
    const curr = this._dashboardId$.value;
    this._dashboardId$.next(v);
    if(v != curr) {
      this.search();
    }
  }

  filterForm = this.fb.group({
    startDate: new Date(),
    endDate: new Date(),
    interval: 0
  });

  roomInfoDialogVisible = false;

  private _dashboardId$ = new BehaviorSubject<string>('');
  get dashboardId$() { return this._dashboardId$ as Observable<string>; }

  $statusDisplay = this._dashboardId$.pipe(map(x=>{
    const id = x.toLowerCase();
    if(id === 'dp' ) {return 'dP' }
    if(id === 'ach') {return 'Airx'}
    if(id === 'hum') {return 'Hum'}
    if(id === 'temp') {return 'Temp'}
    return 'Composite'; // 'Sum All'
  }));


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


  filterParams: any = {
    startDate: '',
    endDate: '',
    interval: ''
  };

  // filterChange($event: any) {
  //   this.isLoading = true;
  //   setTimeout(() => {
  //     this.service.filterPiData($event);
  //   }, 0);
  // }

  isLoading = false;

  showFilterToolbar = false;

  showMapKey = false;

  dialogRef!: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    public service: FacilityTimelineDashboardService,
    private fb: FormBuilder
  ) {

    this.monitoredRoomsChartData$ = this.service.gsfGrowthByClassification$;

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
    this.selectedRoomInfo$.pipe(
      map((x) => Object.keys(x).length > 0)
    ).subscribe(x=>{
      this.roomInfoDialogVisible = x;
    });
    
    this.facilityFilterOptions$ = this.service.facilityFilterOptions$;

    this.timelineChartData$.subscribe(() => {
      this.isLoading = false;
    });

    

  }

  ngOnInit(): void {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    this.filterForm.patchValue({
      startDate: yesterday,
      endDate: new Date(),
      interval: 60
    });
    
    this.search();
  }


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

    // [roomInfo]="(selectedRoomInfo$ | async) || {}"
    //                             [attribute]="(selectedAttributeStatus$ | async) || 'composite'"

  //   this.dialogRef = this.dialogService.open(RoomInfoDisplayComponent, { 
  //     data: {
  //         id: '51gF3'
  //     },
  //     header: 'Select a Product'
  // });
    // console.log($event);
  }

  pinMouseOver($event: any) {
    this.service.setHoveredPin($event);
  }

  pinMouseOut($event: any) {
    this.service.setHoveredPin('');
  }

  public intervalOptions = [
    { name: '10 Min', value: 10 },
    { name: '30 Min', value: 30 },
    { name: '1 Hour', value: 60 },
    { name: '24 Hour', value: 1440 }
  ];

  get startDate():Date {
    return this.filterForm.get("startDate")?.value!;
  }
  get endDate():Date {
    return this.filterForm.get("endDate")?.value!;
  }
  get interval():number {
    return this.filterForm.get("interval")?.value!;
  }
  
  search() {

    this.isLoading = true;
      this.service.filterPiData({
        facility:{repName:'',sectionName:this.facilitySection, value:this.facilityId},
        portfolioId:this.portfolioId,
        facilityOrPortfolio:this.portfolioId ? 'portfolio' : 'facility',
        status:this._dashboardId$.value,
        startDate:this.startDate,
        endDate:this.endDate,
        interval:this.interval
      })
  }

  hideRoomInfo(evt:any){
    console.log('You can close me');
  }

}
