import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {showInfo} from "./sweetalert/alerts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private authService: AuthService) {}

  protected logout() {
    showInfo('success', 'Logout successful.')
    this.authService.logout();
  }

  protected isAuthenticated() {
    return this.authService.isAuthenticated;
  }

}
