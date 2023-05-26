import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-facility-description',
  templateUrl: './facility-description.component.html',
  styleUrls: ['./facility-description.component.css']
})
export class FacilityDescriptionComponent implements OnInit {

  @Input()
  facilityId = 0;
  
  @Input()
  aboutText:string = ''

  @Input()
  photos:{url:string, docTitle:string}[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
