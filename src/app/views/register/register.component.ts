import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User } from "../../models/user";
import { showInfo } from "../../sweetalert/alerts";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) {}

  protected register(registerForm: NgForm) {
    const user = {
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
      name: registerForm.value.name,
      surname: registerForm.value.surname,
      birthday: new Date(registerForm.value.birthday),
      profilePicture: registerForm.value.profilePicture.length > 0 ? registerForm.value.profilePicture : null
    } as User
    this.authService.register(user).subscribe(
      {
        next: data => {
          if (data.success) {
            showInfo('success', data.message);
            this.router.navigate(['/home']).then();
          } else showInfo('error', data.message);
        }
      }
    );
  }

  protected invalidMsgPwd(registerForm: NgForm) {
    const password: string = registerForm.value.password;
    if (password.length < 1) return 'Password can\'t be empty';
    if (!/[a-z]/.test(password)) return 'Password must have at least one letter';
    if (!/[A-Z]/.test(password)) return 'Password must have at least one capital letter.';
    if (!/[0-9]/.test(password)) return 'Password must have at least one number.'
    return 'Password must have at least one special character.'
  }

  protected invalidDate(registerForm: NgForm) {
    return new Date(registerForm.value.birthday) <= new Date();
  }
}
