import { DataService } from 'src/app/api/data.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class ApfPortfolioAllDashboardService {
  constructor(private dataService: DataService) {}

  gsfByFacility$ = this.dataService
    .gsfByFacility()
    .pipe(map((d:any) => d.map((x:any) => [x.facility, x.gsf])));

  gsfByIC$ = this.dataService
    .gsfByIC()
    .pipe(map((d:any) => d.map((x:any) => [x.ic, x.gsf])));

  gsfGrowthByClassification$ = this.dataService
    .gsfGrowthByClassification()
    .pipe(
      map((d:any) =>
        d.map((x:any) => {
          const goLiveDate = new Date(x.goLiveDate);
          return [goLiveDate, x.cncRoomsArea, x.iso8RoomsArea, x.iso7RoomsArea];
        })
      )
    );
}
