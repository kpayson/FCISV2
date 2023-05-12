import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../api/data.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-contact-us-dialog',
  templateUrl: './contact-us-dialog.component.html',
  styleUrls: ['./contact-us-dialog.component.scss'],
  providers: []
})
export class ContactUsDialogComponent implements OnDestroy {
  
  @Output() onClose = new EventEmitter();
  
  constructor(public ref: DynamicDialogRef) {}
  
  emailForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    fromAddress: new FormControl('', [Validators.required, Validators.email]),
    subjectLine: new FormControl('', [Validators.required]),
    messageBody: new FormControl('', [Validators.required])
  });

  get name() {
    return this.emailForm.get('name');
  }

  get fromAddress() {
    return this.emailForm.get('fromAddress');
  }

  get subjectLine() {
    return this.emailForm.get('subjectLine');
  }

  get messageBody() {
    return this.emailForm.get('messageBody');
  }

  sendEmail() {
    if (this.emailForm.valid) {
      this.onClose.emit();
      this.ref.close(this.emailForm.value);
    }
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
