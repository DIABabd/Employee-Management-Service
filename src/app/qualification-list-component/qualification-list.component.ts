import { Component } from '@angular/core';
import { QualificationService } from '../services/qualification.service';
import {map, Observable} from 'rxjs';
import { Qualification } from '../Employee';
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SearchBarComponent} from "../search-bar-component/search-bar.component";

@Component({
  selector: 'app-qualification-list-component',
  templateUrl: './qualification-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    RouterLink,
    SearchBarComponent
  ],
  styleUrls: ['./qualification-list.component.css']
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;
  searchTerm = '';

  constructor(private qualificationService: QualificationService) {
    this.qualifications$ = this.qualificationService.getAll();
  }

  deleteQualification(id: number | undefined): void {
    if (confirm('Are you sure you want to delete this qualification?')) {
      this.qualificationService.deleteQualification(id).subscribe({
        next: () => {
          // Refresh the list after deletion
          this.qualifications$ = this.qualificationService.getAll();
        },
        error: (err) => console.error('Error deleting qualification:', err)
      });
    }
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
    this.qualifications$ = this.qualificationService.getAll().pipe(
      map((qualifications: any[]) => qualifications.filter(q =>
        q.skill.toLowerCase().includes(this.searchTerm)
      ))
    );
  }
}
