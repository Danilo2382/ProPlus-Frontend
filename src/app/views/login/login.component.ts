import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { showInfo } from "../../sweetalert/alerts";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  protected imgSrc = 'https://api.logo.com/api/v2/images?logo=logo_95cfb8ed-d547-4910-a00b-4c02edadab9c&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=2024-09-25T20%3A53%3A04.760Z';
  protected username: string | null = localStorage.getItem('username');

  constructor(protected authService: AuthService) {}

  protected login(loginForm: NgForm) {
    this.authService.login(loginForm.value.username, loginForm.value.password).subscribe(
      {
        next: data => {
          if (data.success) {
            showInfo("success", data.message);
            this.username = localStorage.getItem('username');
          }
          else showInfo('error', data.message);
        }
      }
    )
  }

}
