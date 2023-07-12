import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Component } from '@angular/core';
import { ContactUsDialogComponent } from '../contact-us-dialog/contact-us-dialog.component';
import { ContactUsMessage } from '../api/models';
import { DataService } from '../api/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  providers: [DialogService, DataService]
})
export class NavMenuComponent {
  ref!: DynamicDialogRef;

  constructor(public dialogService: DialogService, private dataService: DataService, private router: Router) { }
  isExpanded = false;


  routeToFacility(facilityId: number) {
    return () => this.router.navigate(['/home', 'facility', facilityId])
  }
  routeToFacilityAll(portfolio: string) {
    return () => this.router.navigate(['/home', 'facility-all', portfolio])
  }

  // CCE 2J Cell Therapy Facility
  // CCE 12E Cell Therapy Facility
  // CCE East Terrace Modular T10B
  // CC Pharmacy I-IVAU
  // CC Pharmacy P-IVAU
  // CC DLM Sterility Lab
  // CC Interim Nuclear Pharmacy 
  // NIAID 29B Pilot Bioproduction Facility
  // NCI SB 1B42
  // NCI SB Hyperpolarized C-13 Facility
  // NCI SB TIL Modular Facility T30
  // NCI Trailer 1 (TR10B)
  // NCI Trailer 2 (TR10A)
  // CC PET Nuclear Pharmacy
  // CC PET Radiopharmacy



  items = [
    {
      label: 'APF Portfolios',
      items: [
        {
          label: 'APF Portfolio (All)',
          command: () => this.router.navigate(['/home', 'apf-portfolio'])
        },
        {
          label: 'CC Portfolio',
          items: [
            {
              label: 'CC (All)',
              command: this.routeToFacilityAll('CC'),
            },
            {
              label: 'CCE 2J Cell Therapy Facility',
              command: this.routeToFacility(3)
            },
            // {
            //   label: 'CCE 12E Cell Therapy Facility',
            //   command: this.routeToFacility(4)
            // },
            {
              label: 'CCE East Terrace Modular T10B',
              command: this.routeToFacility(5)
            },
            {
              label: 'CC Pharmacy I-IVAU',
              command: this.routeToFacility(17)
            },
            // {
            //   label: 'CC Pharmacy P-IVAU',
            //   command: this.routeToFacility(9)
            // },
            {
              label: 'CC DLM Sterility Lab',
              command: this.routeToFacility(6)
            },
            // {
            //   label: 'CC Interim Nuclear Pharmacy',
            //   command: this.routeToFacility(7)
            // },
            {
              label: 'CC PET Radiopharmacy',
              command: this.routeToFacility(1)
            },
            {
              label: 'CC PET Radiochemistry',
              command: this.routeToFacility(2)
            }
          ]
        },
        {
          label: 'CCE Portfolio',
          items: [
            {
              label: 'CCE (All)',
              command: this.routeToFacilityAll('CCE')
            },
            {
              label: 'CCE 2J Cell Therapy Facility',
              command: this.routeToFacility(3)
            },
            // {
            //   label: 'CCE 12E Cell Therapy Facility',
            //   command: this.routeToFacility(4)
            // },
            {
              label: 'CCE East Terrace Modular T10B',
              command: this.routeToFacility(5)
            },
          ]
        },
        {
          label: 'CC Pharmacy',
          items: [
            {
              label: 'CC Pharmacy (All)',
              command: this.routeToFacilityAll('CCPharmacy')
            },
            {
              label: 'CC Pharmacy I-IVAU',
              command: this.routeToFacility(17)
            },
            {
              label: 'CC Pharmacy P-IVAU',
              command: this.routeToFacility(9)
            }
          ]
        },
        {
          label: 'CC Other',
          items: [
            {
              label: 'CC Other (All)',
              command: this.routeToFacilityAll('CCOther')
            },
            {
              label: 'CC DLM Sterility Lab',
              command: this.routeToFacility(6)
            },
            // {
            //   label: 'CC Interim Nuclear Pharmacy',
            //   command: this.routeToFacility(7)
            // },
            {
              label: 'CC PET Radiopharmacy',
              command: this.routeToFacility(1)
            },
            {
              label: 'CC PET Radiochemistry',
              command: this.routeToFacility(2)
            }
          ]
        },
        // {
        //   label: 'NIAD Portfolio',
        //   items: [
        //     {
        //       label: 'NIAID 29B Pilot Bioproduction Facility',
        //       command: this.routeToFacility(20)
        //     }
        //   ]
        // },
        {
          label: 'NCI Portfolio',
          items: [
            {
              label: 'NCI (All)',
              command: this.routeToFacilityAll('NCI'),
            },
            {
              label: 'NCI SB 1B42', //VVF
              command: this.routeToFacility(10)
            },
            {
              label: 'NCI SB TIL Modular Facility T30',
              command: this.routeToFacility(11)
            },
            {
              label: 'NCI Trailer 1 (TR10B)',
              command: this.routeToFacility(12)
            },
            {
              label: 'NCI Trailer 2 (TR10A)',
              command: this.routeToFacility(13)
            },
            {
              label: 'NCI SB Hyperpolarized C-13 Facility',
              command: this.routeToFacility(19)
            }
          ]
        },

      ]
    },


  ];

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

  resourcesClick() {
    this.router.navigate(['/home','resources'])
  }
}
