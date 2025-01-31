import { Component } from '@angular/core';
import { KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-login-redirect-component',
  standalone: true,
  imports: [],
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css'
})

export class LoginRedirectComponent {
  constructor(private keycloak: KeycloakService) {
    this.keycloak.login();
  }
}
