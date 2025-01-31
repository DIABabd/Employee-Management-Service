// Add EventEmitter and Output
import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search-bar-component',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm = '';

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
