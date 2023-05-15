import { Component, Input, OnInit } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import {FacilityInfoPageService} from './facility-info-page.service';

interface FacilityInfoPageData {
  facilityNameTitle: string;
  aboutBeginningDescription: string;
  aboutRemainingDescription: string;
  diagramUrl: string;
  images: {title:string, url:string}[];
  documents: {description: string, url: string}[]
} 

@Component({
  selector: 'app-facility-info-page',
  templateUrl: './facility-info-page.component.html',
  styleUrls: ['./facility-info-page.component.css'],
  providers: [FacilityInfoPageService]
})
export class FacilityInfoPageComponent implements OnInit {

  facilityNameTitle='';
  beginingDescription='';
  remainingDescription='';

  constructor(private activatedRoute: ActivatedRoute,public service:FacilityInfoPageService) { 

    this.activatedRoute.params
    .pipe(
      filter(Boolean)
    )
    .subscribe((params) => {
      this.service.Load(params.facilityId)
    });
  }

  @Input()
  facilityInfoPageData: FacilityInfoPageData = {
    facilityNameTitle:'',
    aboutBeginningDescription:'',
    aboutRemainingDescription:'',
    diagramUrl:'',
    images:[],
    documents:[]
  }

  ngOnInit(): void {
  }
 
 showAllMessage = false;
 toggleMessage="read more...";
 
 selectedTab = 'about';


 items = [
    {
      label: "About",
      icon: "pi pi-fw pi-home",
      command: (event:any) => {
        this.selectedTab = 'about';
      }
    },
    {
      label: "Diagram",
      icon: "pi pi-map",
      command: (event:any) => {
        this.selectedTab = 'diagram';
      }
    },
    {
      label: "Documents",
      icon: "pi pi-fw pi-file",
      command: (event:any) => {
        this.selectedTab = 'documents'
      }
    }, {
      label: "Pictures",
      icon: "pi pi-fw pi-images",
      command: (event:any) => {
        this.selectedTab = 'pictures'
      }
    }
  ];

  toggleMessageClick() {
    this.showAllMessage = !this.showAllMessage;
    this.toggleMessage = this.showAllMessage ? "show less" : "show more...";
  }


}
