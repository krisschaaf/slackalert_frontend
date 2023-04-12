import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private userService: UserService,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) { }

  loginUser() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/config',
      },
    });
  }

  logoutUser() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
