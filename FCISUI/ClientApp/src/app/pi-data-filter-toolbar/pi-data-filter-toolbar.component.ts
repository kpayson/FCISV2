import { BehaviorSubject, Observable, Subject, debounce, timer } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pi-data-filter-toolbar',
  templateUrl: './pi-data-filter-toolbar.component.html',
  styleUrls: ['./pi-data-filter-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PiDataFilterToolbarComponent {
  @Input()
  facilities: any[] = [];

  @Output() 
  filterChange = new EventEmitter<any>();

  constructor(private fb:FormBuilder) { 
    this.filterForm.valueChanges
    //.pipe(debounce(() => timer(100)))
    .subscribe((val:any)=>{
      this.filterChange.emit(val)
    })

    this._statusOptions$= new BehaviorSubject(this.facilityStatusOptions);
    
    this.filterForm.controls.facility.valueChanges.subscribe((fac:any)=>{
      const facId = Number(fac) 
      this._statusOptions$.next(facId === 0 ? this.facilityStatusOptions : this.roomStatusOptions);

      if(facId === 0 && this.filterForm.controls.status.value !== 'Sum All') {
        this.filterForm.patchValue({status:'Sum All'});
      }
    });


  }



  private get defaults() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    return {
      facility:this.facilities? this.facilities[0] : {repName:'',sectionName:'', value:0},
      status:"Sum All",
      startDate: yesterday,
      endDate:new Date(),
      interval:10
    }
  }

  filterForm = this.fb.group(this.defaults);

  selectedCity = {};

  filterStyle = {
    width:'200px'
  }

  private roomStatusOptions = [
    {name:"Composite Status", value:"Sum All" },
    {name:"Temp Status", value:"Temp"},
    {name:"dp Status", value:"DP"},
    {name:"RH Status", value:"Hum"},
    {name:"ACH Status", value:"Airx"}
  ];

  private facilityStatusOptions = [
    {name:"Composite Status", value:"Sum All" },
  ];

  private _statusOptions$: Subject<{name:string, value:string}[]>
  public get statusOptions$() { return this._statusOptions$ as Observable<{name:string, value:string}[]> }


  public intervalOptions = [
    {name:"10 Min", value:"10"},
    {name:"30 Min", value:"30"},
    {name:"1 Hour", value:"60"},
    {name:"24 Hour", value:"1440"},
  ];

  reset(){
    this.filterForm.patchValue(this.defaults);
  }

}
