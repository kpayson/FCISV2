import { Injectable } from "@angular/core";
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs';


@Injectable()
export class ApfPortfolioAllDashboardService {
    constructor(private dataService: DataService) { }

    gsfByFacility$ = this.dataService.gsfByFacility()   
        .pipe(map(d => d.map(x => [x.facility, x.gsf])));

    gsfByIC$ = this.dataService.gsfByIC()
        .pipe(map(d => d.map(x => [x.ic, x.gsf])));

    gsfGrowthByClassification$ = this.dataService.gsfGrowthByClassification()
        .pipe(map(d => d.map(x => {
            const goLiveDate = new Date(x.goLiveDate);
            return [goLiveDate, x.cncRoomsArea, x.iso8RoomsArea, x.iso7RoomsArea]
        })));
}