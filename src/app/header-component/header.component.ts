import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private keycloak: KeycloakService) {}

  logout() {
    this.keycloak.logout('http://localhost:4200'); // Redirect to the home page after logout
  }
}
