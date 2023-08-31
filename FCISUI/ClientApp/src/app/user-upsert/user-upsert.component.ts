import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent {

  personForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Initialize the form with empty values and validators
    this.personForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      miName: [''],
      userId: ['', Validators.required],
      nihId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      ic: ['', Validators.required],
      org: ['', Validators.required],
      orgAbbr: ['', Validators.required],
      title: ['', Validators.required],
      comments: [''],
      active: [false]
    });
  }

  save(){
    
  }
}
