import { Component } from '@angular/core';
import { QualificationService } from '../services/qualification.service';
import { Observable } from 'rxjs';
import { Qualification } from '../Employee';
import { RouterLink } from '@angular/router';
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-qualification-list-component',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgForOf],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;

  constructor(private qualificationService: QualificationService) {
    this.qualifications$ = this.qualificationService.getAll();
  }
}
