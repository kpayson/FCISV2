import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-facility-all-map',
  templateUrl: './facility-all-map.component.html',
  styleUrls: ['./facility-all-map.component.css']
})
export class FacilityAllMapComponent implements OnInit, AfterViewInit {

  @Input()
  facilityId = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      const circles = document.querySelectorAll(`circle`);
      circles.forEach(circle => {
        const fid = Number.parseInt(circle.getAttribute("data-fid") || "0")
        const circleColor = (this.facilityId === fid) ? "yellow" : "gray";
        circle.style.fill=circleColor;
      });      
  }

}
