import { Injectable } from "@angular/core";
import { DataService } from 'src/app/data.service';
import { map,of } from 'rxjs';



@Injectable()
export class ApfPortfolioIcDashboardService {
    constructor(private dataService: DataService) { }

    gsfGrowthByClassification$ = this.dataService.gsfGrowthByClassification()
        .pipe(map(d=> d.map(x=> {
            const goLiveDate = new Date(x.goLiveDate);
            return [goLiveDate, x.cncRoomsArea + x.iso8RoomsArea + x.iso7RoomsArea, x.criticalEnvironmentParametersCount]
        })));

    private chlDataTransformForChart = (row:any)=> {
        const statusColor = (status:string)=> {
            switch(status){
                case 'Within Spec':
                    return 'green';
                case 'Comm Loss':
                    return 'gray';
                case 'Warning':
                    return 'yellow';
                case 'Alarm (Out of Spec)':
                    return 'red';
                default:
                    return 'white';
            }
        };

        const createCustomHTMLContentTableDP = (name:string) => {
            return '<div align="left" style="max-width: 300px; padding:5px 5px 5px 5px;">' +
                '<table>' +
                '<tr><th>' + 'Name: ' + name + '</th></tr>' +
                '</table>' + '</div>';
        };

        const createCustomHTMLContentTable = (roomName:string, roomNumber:string, className:string, gsf:string) => {
            return '<div align="left" style="max-width: 300px; padding:5px 5px 5px 5px;">' +
                '<table>' +
                '<tr><th>' + 'Room: ' + roomName + '</th></tr>' +
                '<tr><td><b>' + 'Room #: ' + roomNumber + '</b></td>' + '</tr>' +
                '<tr><td><b>' + 'Class: ' + className + '</b></td>' + '</tr>' +
                '<tr><td><b>' + 'GSF: ' + gsf + '</b></td>' + '</tr>' +
                '</table>' + '</div>';
        };

        const tooltipText = (data:any)=> {
            return data.statusAttr === 'DP' ?
                createCustomHTMLContentTableDP(data.roomNumber) :
                createCustomHTMLContentTable(data.roomName, data.roomNumber, data.class, data.gsf);
        };


        return [row.roomName, tooltipText(row), row.chillerStatus, statusColor(row.chillerStatus), row.startTime, row.endTime];

    }

    

    chlTimeline = (startDate:Date,endDate:Date,facid:any,atr:any,interval:any) => {
        return this.dataService.chlTimelineData(startDate,endDate,facid,atr,interval).pipe(map(d=>d.map(this.chlDataTransformForChart)))
        // return of( 
        // [
        //   [ 'Washington', '','','', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
        //   [ 'Adams',      '','','', new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
        //   [ 'Jefferson',  '','','', new Date(1801, 2, 4),  new Date(1809, 2, 4) ]
        // ]);
    } 


            
}
    