import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { QualificationService } from '../services/qualification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Employee';
import { Qualification } from '../Employee';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-detail-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {
  employee!: Employee;
  qualifications: Qualification[] = [];
  editForm: FormGroup;
  selectedQualification: number | null = null;
  skillSet: Qualification[] = [];
  availableQualifications: Qualification[] = [];

  constructor(
    private employeeService: EmployeeService,
    private qualificationService: QualificationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      street: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(Number(id));
      this.loadQualifications();
    }
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.skillSet = employee.skillSet ? [...employee.skillSet] : []; // Clone the array or use an empty array
        this.editForm.patchValue(employee);
      },
      error: (err) => console.error('Error loading employee:', err)
    });
  }

  loadQualifications(): void {
    this.qualificationService.getAll().subscribe({
      next: (qualifications) => this.qualifications = qualifications,
      error: (err) => console.error('Error loading qualifications:', err)
    });
  }

  updateEmployee(): void {
    if (this.editForm.valid) {
      this.employeeService.updateEmployee(this.employee.id!, this.editForm.value)
        .subscribe({
          next: () => this.router.navigate(['/dashboard/employees']),
          error: (err) => console.error('Error updating employee:', err)
        });
    }
  }

  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employee.id!)
        .subscribe({
          next: () => this.router.navigate(['/dashboard/employees']),
          error: (err) => console.error('Error deleting employee:', err)
        });
    }
  }

  assignQualification(): void {
    if (this.selectedQualification) {
      this.employeeService.addQualification(this.employee.id!, this.selectedQualification)
        .subscribe({
          next: () => {
            // Add to local array instead of reloading
            const qual = this.qualifications.find(q => q.id === this.selectedQualification);
            if (qual) {
              this.skillSet.push(qual);
              this.selectedQualification = null;
            }
          },
          error: (err) => console.error('Error:', err)
        });
    }
  }

  removeQualification(qualificationId: number): void {
    this.employeeService.removeQualification(this.employee.id!, qualificationId)
      .subscribe({
        next: () => {
          // Remove from local array
          this.skillSet = this.skillSet.filter(q => q.id !== qualificationId);
        },
        error: (err) => console.error('Error:', err)
      });
  }
}
