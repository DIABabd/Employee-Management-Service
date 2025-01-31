import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Qualification} from "../Employee";

@Injectable({ providedIn: 'root' })
export class QualificationService {
  private apiUrl = 'http://localhost:8089/qualifications';

  constructor(private http: HttpClient) {}

  // Get all qualifications
  getAll(): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(this.apiUrl);
  }

  // Create qualification
  create(skill: string): Observable<Qualification> {
    return this.http.post<Qualification>(this.apiUrl, { skill });
  }
}
