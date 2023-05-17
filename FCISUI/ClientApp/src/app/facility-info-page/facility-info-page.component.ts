import { } from '../safe-url.pipe';

import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { ContactUsDialogComponent } from '../contact-us-dialog/contact-us-dialog.component';
import { ContactUsMessage } from '../api/models';
import { DataService } from '../api/data.service';
import { FacilityInfoPageService } from './facility-info-page.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-facility-info-page',
  templateUrl: './facility-info-page.component.html',
  styleUrls: ['./facility-info-page.component.css'],
  providers: [DialogService, FacilityInfoPageService, DataService]
})
export class FacilityInfoPageComponent implements OnInit {

  ref!: DynamicDialogRef;

  documentPage: string = '';
  diagramUrl: SafeResourceUrl = '';
  hasDiagram = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public service: FacilityInfoPageService,
    public dialogService: DialogService,
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {

    this.activatedRoute.params
      .pipe(
        filter(Boolean)
      )
      .subscribe((params) => {
        this.service.Load(params.facilityId)
      });

    this.service.diagram$.subscribe(d => {
      this.diagramUrl = this.sanitizer.bypassSecurityTrustResourceUrl(d);
      this.hasDiagram = Boolean(d);
    })

  }


  ngOnInit(): void {
  }

  selectedTab = 'about';

  items = [
    {
      label: "About",
      icon: "pi pi-fw pi-home",
      command: (event: any) => {
        this.selectedTab = 'about';
      }
    },
    {
      label: "Diagram",
      icon: "pi pi-map",
      command: (event: any) => {
        this.selectedTab = 'diagram';
      }
    },
    {
      label: "Documents",
      icon: "pi pi-fw pi-file",
      command: (event: any) => {
        this.selectedTab = 'documents'
      }
    }, {
      label: "Pictures",
      icon: "pi pi-fw pi-images",
      command: (event: any) => {
        this.selectedTab = 'pictures'
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
