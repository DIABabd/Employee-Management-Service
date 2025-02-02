import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { QualificationService } from '../services/qualification.service';
import { Router, RouterLink } from '@angular/router';
import { Qualification } from '../Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ],
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  form: FormGroup;
  qualifications: Qualification[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private qualificationService: QualificationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      street: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      skillSet: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadQualifications();
  }

  get skillSet() {
    return this.form.get('skillSet') as FormArray;
  }

  private loadQualifications(): void {
    this.qualificationService.getAll().subscribe({
      next: (qualifications) => this.qualifications = qualifications,
      error: (err) => console.error('Failed to load qualifications', err)
    });
  }

  toggleQualification(qualificationId: number, isChecked: boolean): void {
    if (isChecked) {
      this.skillSet.push(this.fb.control(qualificationId));
    } else {
      const index = this.skillSet.controls.findIndex(c => c.value === qualificationId);
      this.skillSet.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.employeeService.createEmployee(this.form.value).subscribe({
        next: () => this.router.navigate(['/dashboard/employees']),
        error: (err) => console.error('Error creating employee:', err)
      });
    }
  }
}
