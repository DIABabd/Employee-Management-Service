import { Component, OnInit } from '@angular/core';
import { KeycloakService } from "keycloak-angular";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private keycloak: KeycloakService) {}

  ngOnInit(): void {
    // Check authentication status when component initializes
    this.updateAuthStatus();
  }

  // Method to check if user is authenticated
  private updateAuthStatus(): void {
    this.keycloak.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.keycloak.logout('http://localhost:4200'); // Redirect to the home page after logout
  }
}
