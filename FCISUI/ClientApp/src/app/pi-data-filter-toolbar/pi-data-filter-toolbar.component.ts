import { BehaviorSubject, Observable, Subject, debounce, timer } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

type filterFormData = {
  facility: FormControl<{
    repName: string;
    sectionName: string;
    value: number;
  }>;
  status: FormControl<string>;
  startDate: FormControl<Date>;
  endDate: FormControl<Date>;
  interval: FormControl<number>;
};

@Component({
  selector: 'app-pi-data-filter-toolbar',
  templateUrl: './pi-data-filter-toolbar.component.html',
  styleUrls: ['./pi-data-filter-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PiDataFilterToolbarComponent implements OnInit {
  @Input()
  facilities: any[] = [];

  @Input()
  defaultFacilityId: number = 0;

  @Input()
  defaultStatus: string = 'Sum All';

  @Input()
  defaultStartDate: Date = (() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  })();

  @Input()
  defaultEndDate: Date = new Date();

  @Input()
  defaultInterval: number = 60;

  @Output()
  filterChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    // this.filterForm.valueChanges
    //   //.pipe(debounce(() => timer(100)))
    //   .subscribe((val: any) => {
    //     this.filterChange.emit(val);
    //   });

    this._statusOptions$ = new BehaviorSubject(this.facilityStatusOptions);

    this.filterForm.controls.facility.valueChanges.subscribe((fac: any) => {
      const facId = Number(fac);
      this._statusOptions$.next(
        facId === 0 ? this.facilityStatusOptions : this.roomStatusOptions
      );

      if (facId === 0 && this.filterForm.controls.status.value !== 'Sum All') {
        this.filterForm.patchValue({ status: 'Sum All' });
      }
    });
  }

  ngOnInit(): void {
    this.filterForm.patchValue({
      facility: this.facilities
        ? this.facilities.find((f) => f.facilityId == this.defaultFacilityId)
        : { repName: '', sectionName: '', value: 0 },
      status: this.defaultStatus,
      startDate: this.defaultStartDate,
      endDate: this.defaultEndDate,
      interval: this.defaultInterval
    });
  }

  filterForm = this.fb.group({
    facility: { repName: '', sectionName: '', value: 0 },
    status: '',
    startDate: new Date(),
    endDate: new Date(),
    interval: 0
  });


  private roomStatusOptions = [
    { name: 'Composite Status', value: 'Sum All' },
    { name: 'Temp Status', value: 'Temp' },
    { name: 'dP Status', value: 'DP' },
    { name: 'RH Status', value: 'Hum' },
    { name: 'ACH Status', value: 'Airx' }
  ];

  private facilityStatusOptions = [
    { name: 'Composite Status', value: 'Sum All' }
  ];

  private _statusOptions$: Subject<{ name: string; value: string }[]>;
  public get statusOptions$() {
    return this._statusOptions$ as Observable<
      { name: string; value: string }[]
    >;
  }

  public intervalOptions = [
    { name: '10 Min', value: 10 },
    { name: '30 Min', value: 30 },
    { name: '1 Hour', value: 60 },
    { name: '24 Hour', value: 1440 }
  ];

  search() {
    const searchVal = this.filterForm.value;
    this.filterChange.emit(searchVal);
  }
}
