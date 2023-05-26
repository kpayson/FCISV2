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
      });
    }

  ngOnInit(): void {
  }
  
  ref!: DynamicDialogRef;
  facilityId = 0;
  
  selectedTab = 'description';

  facility = {
    title:'Clinical Center - Center for Cellular Engineering'
  };

  items = [
    {
      label: "Description",
      command: (event: any) => {
        this.selectedTab = 'description';
      }
    },
    {
      label: "Dashboard",
      command: (event: any) => {
        this.selectedTab = 'dashboard';
      }
    },
    {
      label: "Facility Reports",
      command: (event: any) => {
        this.selectedTab = 'facility_reports'
      }
    }, 
    {
      label: "Documents",
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
    {
      label: "FCIS Resources",
      command: (event: any) => {
        this.selectedTab = 'fcis_resources'
      }
    }
  ];

  contactUsClick() {
    this.ref = this.dialogService.open(ContactUsDialogComponent, { header: 'Contact Us' });

    this.ref.onClose.subscribe((message: ContactUsMessage) => {
      if (message) {
        this.dataService.contactUs(message).subscribe();
      }
    });
  }

}
