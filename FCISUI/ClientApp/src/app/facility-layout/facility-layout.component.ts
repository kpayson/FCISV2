import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ActivatedRoute } from '@angular/router';
import { ContactUsDialogComponent } from '../contact-us-dialog/contact-us-dialog.component';
import { ContactUsMessage } from '../api/models';
import { DataService } from '../api/data.service';
import { FacilityInfoPageService } from '../facility-info-page/facility-info-page.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-facility-layout',
  templateUrl: './facility-layout.component.html',
  styleUrls: ['./facility-layout.component.css'],
  providers:[DialogService, FacilityInfoPageService, DataService]
})
export class FacilityLayoutComponent implements OnInit {

  constructor(
    public dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    public service: FacilityInfoPageService) { 

      this.activatedRoute.params
      .pipe(
        filter(Boolean)
      )
      .subscribe((params) => {
        this.service.Load(params.facilityId);
        this.facilityId = Number.parseInt(params.facilityId) || 0;
        this.portfolioId = params.portfolio || "";
        this.facilityMenuItems = this.getFacilityMenuItems(String(this.facilityId || this.portfolioId))
        this.selectedTab = 'description';
      });
    }

  ngOnInit(): void {
  }
  
  ref!: DynamicDialogRef;
  facilityId = 0;
  portfolioId = '';
  facilityMenuItems: any[] = [];

  portfolioFacilities = {
    'CC':[1,2,3,4,5,6,7,17],
    'CCE':[3,4,5],  //2J, 12E, T10B
    'CCPharmacy':[17,9], // CC Pharmacy I-IVAU, CC Pharmacy P-IVAU
    'CCOther':[1,2,6,7], // DLM Sterility Lab, Interim Nuclear Pharmacy, Nuclear Pharmacy, PET Nuclear Pharmacy, PET Radiopharmacy
    'NCI':[10,19,11,12,13], //SB 1B42, SB Hyperpolarized C-13 Facility, SB TIL Modular Facility T30, NCI Trailer 1 (TR10B), NCI Trailer 2 (TR10A)
    'NIAID':[20] //Pilot Bioproduction Facility (PBF)
  }
  
//   FacilityId	FacilityName
// 1	CC B1 PET Radiopharmacy
// 2	CC B3 PET Radiochemistry
// 3	CC-CCE 2J
// 4	CC-CCE 12E
// 5	CC-CCE East Terrace Modular (T10B)
// 6	CC DLM Sterility
// 7	CC-NMD Radiopharmacy
// 8	CC PHAR I-IVAU
// 9	CC PHAR Pharmacy &amp; IVAU
// 10	NCI 1B42
// 11	NCI TIL Modular (T30)
// 12	NCI Trailer 1 (10B)
// 13	NCI Trailer 2 (10A)
// 14	APF Common
// 15	NCI Surgery Branch 3 West TIL Lab
// 16	CC CCE 3T Cell Therapy Lab
// 17	CC PHAR I-IVAU Expansion
// 18	NIAID Viral Seed Stock 
// 19	NCI Hyperpolarized C-13 Facility 
// 20	Pilot Bioproduction Facility (PBF) 
  
  selectDashboard(dashboardId:string) {
    this.selectedTab = 'dashboard';
    this.selectedDashboard = dashboardId;
  }


  dashboardOptions = {
    dP:   {label:"dP Dashboard", command:()=>this.selectDashboard("DP")},
    ach:  {label:"ACH Dashboard", command:()=>this.selectDashboard("Airx")},
    temp: {label:"TEMP Dashboard", command:()=>this.selectDashboard("Temp")},
    hum:  {label:"HUMID Dashboard", command:()=>this.selectDashboard("Hum")},
    composite: {label:"COMPOSITE Dashboard", command:()=>this.selectDashboard("Sum All")},
  }

  allStatusOptions = [
    this.dashboardOptions.dP,
    this.dashboardOptions.ach,
    this.dashboardOptions.temp,
    this.dashboardOptions.hum,
    this.dashboardOptions.composite,
  ]

  allStatusOptionsExceptDP = [
    this.dashboardOptions.ach,
    this.dashboardOptions.temp,
    this.dashboardOptions.hum,
    this.dashboardOptions.composite
  ]

  facilityDashboards:{[key:string]:any} = {
    "CC": [this.dashboardOptions.composite],
    "CCE": [this.dashboardOptions.composite],
    "CCPharmacy": [this.dashboardOptions.composite],
    "CCOther": [this.dashboardOptions.composite],
    "NCI": [this.dashboardOptions.composite],
    "NIAID": [this.dashboardOptions.composite],
    "1": this.allStatusOptionsExceptDP,
    "2": this.allStatusOptionsExceptDP,
    "3": this.allStatusOptions,
    "4": this.allStatusOptionsExceptDP,
    "5": this.allStatusOptions,
    "6": this.allStatusOptions,
    "7": [{label:"Unavailable"}], //this.allStatusOptionsExceptDP,
    "8": this.allStatusOptions,
    "9": this.allStatusOptionsExceptDP,
    "10": this.allStatusOptions,
    "11": this.allStatusOptions,
    "12": this.allStatusOptions,
    "13": this.allStatusOptions,
    "14": this.allStatusOptionsExceptDP,
    "15": this.allStatusOptionsExceptDP,
    "16": this.allStatusOptionsExceptDP,
    "17": this.allStatusOptionsExceptDP,
    "18": this.allStatusOptionsExceptDP,
    "19": this.allStatusOptions,
    "20": this.allStatusOptions
  }

  facilitySections:{[key:string]:string} = {
    "1": "PET_1",
    "2": "PET_B3",
    "3": "2J",
    "5": "E_TER",
    "6": "DLM_SL",
    "9": "P_IVAU",
    "10": "WF",
    "11": "T30",
    "12": "Tr1",
    "13": "Tr2",
    "17": "IIVAU",
    "19": "HPP"
  }

  selectedTab = 'description';
  selectedDashboard = '';

  facility = {
    title:'Clinical Center - Center for Cellular Engineering'
  };

  getFacilityMenuItems(facIdOrPort:string){
    const items = [
      {
        label: "Facility Description",
        command: (event: any) => {
          this.selectedTab = 'description';
        }
      },
      {
        label: "Facility Dashboard",
        items:this.facilityDashboards[String(facIdOrPort)] || [{label:'No dashboards available'}]
      },
      {
        label: "Facility Reports",
        command: (event: any) => {
          this.selectedTab = 'facility_reports'
        }
      }, 
      {
        label: "Facility Documents",
        command: (event: any) => {
          this.selectedTab = 'documents'
        }
      },
      {
        label: "Condition Reports",
        command: (event: any) => {
          this.selectedTab = 'condition_reports'
        }
      },
      // {
      //   label: "FCIS Resources",
      //   command: (event: any) => {
      //     this.selectedTab = 'fcis_resources'
      //   }
      // }
    ];
    return items;
  }
  

  contactUsClick() {
    this.ref = this.dialogService.open(ContactUsDialogComponent, { header: 'Contact Us' });

    this.ref.onClose.subscribe((message: ContactUsMessage) => {
      if (message) {
        this.dataService.contactUs(message).subscribe();
      }
    });
  }

  

}
