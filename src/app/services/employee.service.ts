import {Employee, Qualification} from "../Employee";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:8089/employees';
  private qualificationsUrl = 'http://localhost:8089/qualifications';

  // Add the bearer token from employee-list.component.ts
  public bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzgzMjQyNjYsImlhdCI6MTczODMyMDY2NiwianRpIjoiZWEwZTU4OGMtNTkyZS00ZDk0LWFlZjctNmRjYTBkNWM1YmQ4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI3OTI0ZDhmZC1lNzMxLTQyZWEtOTUyMC1hMGM5NDc1MWNhZDgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.Os1hQV2TSdyRz2E-f1IoaB4_5HAm_PSX_uutmRWLi0GfatqI_kXaFAegyqQw7lwWjVY1Yooxtbrl5YmFLxnNssrqLxeSvfoKjrejUmOcag1yWTgfFP0cB73LsewxOdXDEjtYN5KEhaAQaDxo4PDS9S50G8MmlPvQQ1OoiwVEcAOxIVwPSeJjfNQ9Gkx0fOBQxPQGXuw1_vV4axGnimVuqq4tFhKjQF9hC3fasOMLN4ilDDSTBrEzYqBzdg-4QLzTGXkxJsb27VR2nzyhhKdx7feAFWUEweg9wh0l2ucl_iEJcPvCgMdDMRAvYX3Y_KmwsUrvozdTf2kyuQNwC_4akg';

  constructor(private http: HttpClient) {}

  // Helper method to get HTTP headers with authentication
  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.bearer}`);
  }

  // Get all employees
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Get all employees with their qualifications
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?expand=skillSet`, { headers: this.getHeaders() });
  }

  // Create employee
  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee, { headers: this.getHeaders() });
  }

  // Create employee with qualification handling
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, {
      ...employee,
      skillSet: employee.skillSet || [] // Ensure array exists
    }, { headers: this.getHeaders() });
  }

  // Get employee by ID
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Update employee
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers: this.getHeaders() });
  }

  // Delete employee
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Add qualification to employee - based on the error message
  // The backend is looking for an int-argument constructor, so send the ID directly as string
  addQualification(employeeId: number, qualificationId: number): Observable<void> {
    console.log(`Adding qualification ID ${qualificationId} to employee ID ${employeeId}`);

    // Format the qualification ID as a string to avoid JSON parsing issues
    const payload = qualificationId.toString();

    // Use text/plain content type to avoid JSON formatting
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/plain')
      .set('Authorization', `Bearer ${this.bearer}`);

    return this.http.post<void>(
      `${this.apiUrl}/${employeeId}/qualifications`,
      payload,
      { headers }
    );
  }

  // Remove qualification from employee
  removeQualification(employeeId: number, qualificationId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${employeeId}/qualifications/${qualificationId}`,
      { headers: this.getHeaders() }
    );
  }
}
