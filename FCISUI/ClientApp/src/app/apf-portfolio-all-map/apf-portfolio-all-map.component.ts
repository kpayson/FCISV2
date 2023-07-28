import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';

import { Router } from '@angular/router';

declare const bootstrap: any;
declare const $: any;

@Component({
  selector: 'app-apf-portfolio-all-map',
  templateUrl: './apf-portfolio-all-map.component.html',
  styleUrls: ['./apf-portfolio-all-map.component.scss']
})
export class ApfPortfolioMapComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  tooltips: {[title: string]: any} = {};

  ngAfterViewInit(): void {
    const pinElems = document.querySelectorAll('#Pins_Ownership a');
    pinElems.forEach((elem) => {
      const title = elem.getAttribute('data-title')!;
      // (elem as any).tooltip({
      //   placement: 'right',
      //   html: true,
      //   title: '<div>' + title + '</div>'
      // });
      this.tooltips[title] = new bootstrap.Tooltip(elem, {
        placement: 'right',
        trigger:'hover',
        html: true,
        title: '<div>' + title + '</div>'
      });
    });
  }
  
  pinClick(facilityId:number) {
    console.log("facility: " + facilityId);
    const elem = document.getElementById(`pin_${facilityId}`)!;
    const title = elem.getAttribute('data-title')!;
    this.tooltips[title].hide();
    // new bootstrap.Tooltip(elem).hide()
    //$('#pin_' + facilityId).tooltip('hide')
    this.router.navigate(['home','facility',facilityId])
  }

  mouseover(facilityId:number) {
    
  }

  mouseout(facilityId:number) {
    
  }
}
