import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pi-data-filter-toolbar',
  templateUrl: './pi-data-filter-toolbar.component.html',
  styleUrls: ['./pi-data-filter-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PiDataFilterToolbarComponent {

  constructor(private fb:FormBuilder) { 
    this.filterForm.valueChanges.subscribe((val:any)=>{
      this.filterChange.emit(val)
    })
  }

  @Input()
  facilities: any[] = [];

  @Output() 
  filterChange = new EventEmitter<any>();

  private get defaults() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    return {
      facility:{},
      status:"",
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

  statusOptions = [
    {name:"Composite Status", value:"Sum All" },
    {name:"Temp Status", value:"Temp"},
    {name:"dp Status", value:"DP"},
    {name:"RH Status", value:"Hum"},
    {name:"ACH Status", value:"Airx"}
  ];

  intervalOptions = [
    {name:"10 Min", value:"10"},
    {name:"30 Min", value:"30"},
    {name:"1 Hour", value:"60"},
    {name:"24 Hour", value:"1440"},
  ];

  reset(){
    this.filterForm.patchValue(this.defaults);
  }

}
