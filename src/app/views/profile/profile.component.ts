import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { FormControl, Validators } from "@angular/forms";
import { showInfo } from "../../sweetalert/alerts";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  protected user!: User;
  protected changeUsername = false;
  protected changeEmail = false;
  protected changePassword = false;
  protected newUsername = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(45),
    Validators.pattern("^[a-zA-Z0-9]+$")
  ]);
  protected newEmail = new FormControl('', [
    Validators.required,
    Validators.pattern("[^@]+@[^@]+\.[a-zA-Z]{2,6}")
  ])
  protected newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$")
  ])

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserDetails()
  }

  private getUserDetails() {
    this.userService.getUserDetails().subscribe(
      {
        next: data => this.user = data,
        error: err => this.showError(err.error)
      });
  }

  protected changeUserInfo(type: 'Username' | 'Email' | 'Password') {
    let newValue: string;
    if (type === 'Username') newValue = <string> this.newUsername.value;
    else if (type === 'Email') newValue = <string> this.newEmail.value;
    else newValue = <string> this.newPassword.value;
    this.userService.changeUserInfo(type, newValue).subscribe(
      {
        next: data => {
          this.showSuccess(data.message);
          if (type === 'Username') {
            sessionStorage.removeItem("JWT");
            this.user.username = newValue;
            this.newUsername.setValue('');
            this.changeUsername = false;
          } else if (type === 'Email') {
            this.user.email = newValue;
            this.newEmail.setValue('');
            this.changeEmail = false;
          } else {
            this.newPassword.setValue('');
            this.changePassword = false;
          }
        }, error: err => this.showError(err.error.message)
      });
  }

  protected activateState(type: 'Username' | 'Email' | 'Password') {
    if (type === 'Username') this.changeUsername = !this.changeUsername;
    else if (type === 'Email') this.changeEmail = !this.changeEmail;
    else this.changePassword = !this.changePassword;
  }

  protected invalidMsgPwd() {
    const password: string = <string> this.newPassword.value;
    if (password.length < 1) return 'Password can\'t be empty';
    if (!/[a-z]/.test(password)) return 'Password must have at least one letter';
    if (!/[A-Z]/.test(password)) return 'Password must have at least one capital letter.';
    if (!/[0-9]/.test(password)) return 'Password must have at least one number.'
    return 'Password must have at least one special character.'
  }

  private showSuccess(message: string) { showInfo('success', message) }

  private showError(message: string) { showInfo('error', message) }

}
