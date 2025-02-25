import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { QualificationService } from '../services/qualification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Employee';
import { Qualification } from '../Employee';
import {FormArray, FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(
    private employeeService: EmployeeService,
    private qualificationService: QualificationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.editForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      street: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      skillSet: this.fb.array([])
    });
  }

  get skillSetFormArray() {
    return this.editForm.get('skillSet') as FormArray;
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
        this.editForm.patchValue({
          lastName: employee.lastName,
          firstName: employee.firstName,
          street: employee.street,
          postcode: employee.postcode,
          city: employee.city,
          phone: employee.phone
        });

        // Initialize skillSet array
        this.skillSet = employee.skillSet || [];

        // Initialize skillSet form array
        const skillSetArray = this.editForm.get('skillSet') as FormArray;
        skillSetArray.clear();
        this.skillSet.forEach(qual => {
          skillSetArray.push(this.fb.control(qual.id));
        });
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
      const updatedEmployee = {
        ...this.editForm.value,
        id: this.employee.id
      };

      this.employeeService.updateEmployee(this.employee.id!, updatedEmployee)
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

  // Direct API call approach to bypass service layer complications
  assignQualification(): void {
    if (this.selectedQualification) {
      // Check if qualification is already assigned
      const exists = this.skillSetFormArray.value.includes(this.selectedQualification);
      if (exists) {
        alert('This qualification is already assigned to the employee');
        return;
      }

      // Find the qualification object
      const qual = this.qualifications.find(q => q.id === this.selectedQualification);

      if (!qual) {
        console.error('Selected qualification not found in list');
        return;
      }

      console.log('Adding qualification:', qual);

      // Add to both the displayed skillSet and the form array immediately for responsive UI
      this.skillSet.push(qual);
      this.skillSetFormArray.push(this.fb.control(qual.id));

      // Create URL for adding the qualification
      const url = `http://localhost:8089/employees/${this.employee.id}/qualifications`;

      // Get the auth token
      const token = this.employeeService.bearer;

      // Try with different payload formats directly
      // Option 1: Use the full qualification object
      const payload1 = qual;

      // Option 2: Send just the skill name as the QualificationPostDTO expects
      const payload2 = { skill: qual.skill };

      // Option 3: Send just the qualification ID
      const payload3 = { id: qual.id };

      // Set up headers with auth token
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      // Make the direct API call
      this.http.post(url, payload2, { headers }).subscribe({
        next: () => {
          console.log('Successfully added qualification with payload2');
          this.selectedQualification = null; // Reset selection
        },
        error: (err) => {
          console.error('Error with payload2:', err);

          // Try with payload3 if payload2 fails
          this.http.post(url, payload3, { headers }).subscribe({
            next: () => {
              console.log('Successfully added qualification with payload3');
              this.selectedQualification = null; // Reset selection
            },
            error: (err2) => {
              console.error('Error with payload3:', err2);

              // Try with payload1 as last resort
              this.http.post(url, payload1, { headers }).subscribe({
                next: () => {
                  console.log('Successfully added qualification with payload1');
                  this.selectedQualification = null; // Reset selection
                },
                error: (err3) => {
                  console.error('Error with payload1:', err3);

                  // Rollback UI changes if all attempts fail
                  const index = this.skillSet.findIndex(q => q.id === qual.id);
                  if (index !== -1) {
                    this.skillSet.splice(index, 1);
                  }

                  const formIndex = this.skillSetFormArray.controls.findIndex(c => c.value === qual.id);
                  if (formIndex !== -1) {
                    this.skillSetFormArray.removeAt(formIndex);
                  }

                  alert('Failed to add qualification after trying multiple formats. Please check console for details.');
                }
              });
            }
          });
        }
      });
    }
  }

  removeQualification(qualificationId: number): void {
    this.employeeService.removeQualification(this.employee.id!, qualificationId)
      .subscribe({
        next: () => {
          // Remove from local arrays
          this.skillSet = this.skillSet.filter(q => q.id !== qualificationId);

          // Also remove from form array
          const index = this.skillSetFormArray.controls.findIndex(control => control.value === qualificationId);
          if (index > -1) {
            this.skillSetFormArray.removeAt(index);
          }
        },
        error: (err) => console.error('Error:', err)
      });
  }
}
