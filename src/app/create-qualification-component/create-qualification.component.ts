import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { QualificationService } from '../services/qualification.service';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-create-qualification-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './create-qualification.component.html',
  styleUrl: './create-qualification.component.css'
})
export class CreateQualificationComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private qualificationService: QualificationService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      skill: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.qualificationService.createQualification(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/qualifications']);
        },
        error: (err) => {
          console.error('Error creating qualification:', err);
        }
      });
    }
  }
}
