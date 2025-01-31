import { Component } from '@angular/core';
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-create-qualification-component',
  standalone: true,
  imports: [],
  templateUrl: './create-qualification.component.html',
  styleUrl: './create-qualification.component.css'
})
export class CreateQualificationComponent {
  form = this.fb.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    street: ['', Validators.required],
    postcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    qualifications: this.fb.array([])
  });
}
