import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  constructor(
    public auth: AuthService) { }

  loginUser() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/config',
      },
    });
  }

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/config',
      },
      screen_hint: 'signup',
    });
  }
}
