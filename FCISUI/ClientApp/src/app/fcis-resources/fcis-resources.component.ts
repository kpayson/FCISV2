import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ContactUsDialogComponent } from '../contact-us-dialog/contact-us-dialog.component';
import { ContactUsMessage } from '../api/models';
import { DataService } from '../api/data.service';
import { Router } from '@angular/router';

// @Component({
//   selector: 'app-nav-menu',
//   templateUrl: './nav-menu.component.html',
//   styleUrls: ['./nav-menu.component.scss'],
//   providers: [DialogService, DataService]
// })
// export class NavMenuComponent {
//   ref!: DynamicDialogRef;

//   constructor(public dialogService: DialogService, private dataService: DataService, private router: Router) { }
//   isExpanded = false;


@Component({
  selector: 'app-fcis-resources',
  templateUrl: './fcis-resources.component.html',
  styleUrls: ['./fcis-resources.component.css'],
  providers: [DialogService, DataService]
})
export class FcisResourcesComponent implements OnInit {
  ref!: DynamicDialogRef;

  constructor(public dialogService: DialogService, private dataService: DataService) { }

  ngOnInit(): void {
  }

  resourcesClick() {
    
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
