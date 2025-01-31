import {Component, NgIterable} from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { RouterLink } from "@angular/router";
import { SearchBarComponent } from "../search-bar-component/search-bar.component";
import { EmployeeService } from "../services/employee.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchBarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzgzMjQyNjYsImlhdCI6MTczODMyMDY2NiwianRpIjoiZWEwZTU4OGMtNTkyZS00ZDk0LWFlZjctNmRjYTBkNWM1YmQ4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI3OTI0ZDhmZC1lNzMxLTQyZWEtOTUyMC1hMGM5NDc1MWNhZDgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.Os1hQV2TSdyRz2E-f1IoaB4_5HAm_PSX_uutmRWLi0GfatqI_kXaFAegyqQw7lwWjVY1Yooxtbrl5YmFLxnNssrqLxeSvfoKjrejUmOcag1yWTgfFP0cB73LsewxOdXDEjtYN5KEhaAQaDxo4PDS9S50G8MmlPvQQ1OoiwVEcAOxIVwPSeJjfNQ9Gkx0fOBQxPQGXuw1_vV4axGnimVuqq4tFhKjQF9hC3fasOMLN4ilDDSTBrEzYqBzdg-4QLzTGXkxJsb27VR2nzyhhKdx7feAFWUEweg9wh0l2ucl_iEJcPvCgMdDMRAvYX3Y_KmwsUrvozdTf2kyuQNwC_4akg';
  employees$: Observable<Employee[]>;
  searchTerm = '';

  constructor(private employeeService: EmployeeService, private http: HttpClient) {
    this.employees$ = this.employeeService.getAllEmployees();
  }

  fetchData(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
    this.employees$ = this.fetchData().pipe(
      map(employees => employees.filter((employee: Employee) =>
        (employee.lastName?.toLowerCase().includes(this.searchTerm)) ||
        (employee.firstName?.toLowerCase().includes(this.searchTerm)) ||
        (employee.city?.toLowerCase().includes(this.searchTerm))
      ))
    );
  }
}
