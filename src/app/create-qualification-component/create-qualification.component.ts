import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-qualification-component',
  standalone: true,
  imports: [],
  templateUrl: './create-qualification.component.html',
  styleUrl: './create-qualification.component.css'
})
export class CreateQualificationComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      street: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      qualifications: this.formBuilder.array([])
    });
  }
}
