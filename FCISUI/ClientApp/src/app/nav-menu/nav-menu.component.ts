import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Component } from '@angular/core';
import { ContactUsDialogComponent } from '../contact-us-dialog/contact-us-dialog.component';
import { ContactUsMessage } from '../api/models';
import { DataService } from '../api/data.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  providers: [DialogService, DataService]
})
export class NavMenuComponent {
  ref!: DynamicDialogRef;

  constructor(public dialogService: DialogService, private dataService: DataService) { }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
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
