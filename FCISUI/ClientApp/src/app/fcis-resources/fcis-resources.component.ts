import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ContactUsDialogComponent } from '../contact-us-dialog/contact-us-dialog.component';
import { ContactUsMessage } from '../api/models';
import { DataService } from '../api/data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fcis-resources',
  templateUrl: './fcis-resources.component.html',
  styleUrls: ['./fcis-resources.component.scss'],
  providers: [DialogService, DataService]
})
export class FcisResourcesComponent implements OnInit {
  ref!: DynamicDialogRef;

  constructor(
    public dialogService: DialogService, 
    private dataService: DataService, 
    private location: Location, 
    private router: Router) { }

  ngOnInit(): void {
  }


  backClick() {
    this.location.back();
  }

  homeClick() {
    this.router.navigate(['/home']);
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
