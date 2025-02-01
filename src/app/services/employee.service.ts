import {Employee} from "../Employee";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:8089/employees';

  constructor(private http: HttpClient) {}

  // Get all employees
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Add this method
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Create employee
  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }


  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addQualification(employeeId: number, qualificationId: number): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/${employeeId}/qualifications`,
      { qualificationId }
    );
  }

  removeQualification(employeeId: number, qualificationId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${employeeId}/qualifications/${qualificationId}`
    );
  }

}
