import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Facility, SvgMap } from '../api/models';
import {
  FacilityTimelineDashboardService,
  TimelineChartData,
  locationStatusLookup
} from './facility-timeline-dashboard.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-facility-timeline-dashboard',
  templateUrl: './facility-timeline-dashboard.component.html',
  styleUrls: ['./facility-timeline-dashboard.component.scss'],
  providers: [FacilityTimelineDashboardService]
})
export class FacilityTimelineDashboardComponent implements OnInit, OnChanges {

  private _facility!: Partial<Facility>;
  @Input()
  get facility() {
    return this._facility;
  }
  set facility(v: Partial<Facility>) {
    this._facility$.next(v);
    this._facility = v;
  }

  @Input()
  get dashboardId() {
    return this._dashboardId;
  }
  set dashboardId(v: string) {
    this._dashboardId$.next(v);
    this._dashboardId = v;
  }

  filterForm = this.fb.group({
    startDate: new Date(),
    endDate: new Date(),
    interval: 0
  });

  roomInfoDialogVisible = false;
  private _dashboardId: string = '';
  
  
  private _dashboardId$ = new BehaviorSubject<string>('');
  get dashboardId$() { return this._dashboardId$ as Observable<string>; }

  private _facility$ = new BehaviorSubject<Partial<Facility>>({});

  $statusDisplay = this._dashboardId$.pipe(map(x => {
    const id = x.toLowerCase();
    if (id === 'dp') { return 'dP' }
    if (id === 'ach') { return 'Airx' }
    if (id === 'hum') { return 'Hum' }
    if (id === 'temp') { return 'Temp' }
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

  filterParams: any = {
    startDate: '',
    endDate: '',
    interval: ''
  };


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

    this.selectedRoomInfo$.pipe(
      map((x) => Object.keys(x).length > 0)
    ).subscribe(x => {
      this.roomInfoDialogVisible = x;
    });

    this.facilityFilterOptions$ = this.service.facilityFilterOptions$;

    // this.timelineChartData$.subscribe(() => {
    //   this.isLoading = false;
    // });

    



  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
  }

  ngOnInit(): void {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    this.filterForm.patchValue({
      startDate: yesterday,
      endDate: new Date(),
      interval: 60
    });

    combineLatest([this._dashboardId$,this._facility$]).subscribe(([dashboardId, facility])=>{
      this.search(dashboardId);
    })

    

    //this.search();
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

  get startDate(): Date {
    return this.filterForm.get("startDate")?.value!;
  }
  get endDate(): Date {
    return this.filterForm.get("endDate")?.value!;
  }
  get interval(): number {
    return this.filterForm.get("interval")?.value!;
  }

  search(timelineAtr?:string) {

    if(!this.facility.facilityId) {
      throw "missing facility in dashboard search";
    }
    if(!this.dashboardId) {
      throw "missing dashboardId search";
    }
    
    //this.isLoading = true;
    this.service.filterPiData({
      facility: { repName: '', sectionName: this.facility.facilitySection || '', value: this.facility.facilityId! },
      // portfolioId: this.portfolioId,
      // facilityOrPortfolio: this.portfolioId ? 'portfolio' : 'facility',
      status: timelineAtr || this.dashboardId,
      startDate: this.startDate,
      endDate: this.endDate,
      interval: this.interval
    })
  }

  hideRoomInfo(evt: any) {
    console.log('You can close me');
  }

}
