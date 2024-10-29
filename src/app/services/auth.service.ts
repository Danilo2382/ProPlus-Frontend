import {Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, of } from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    if (localStorage.getItem('isLoggedIn') === 'true') return;
    localStorage.setItem('isLoggedIn', 'false');
  }

  register(user: User) {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname,
      birthday: user.birthday,
      profilePicture: user.profilePicture
    }
    return this.http.post<boolean>('/auth/register', body).pipe(
      map(response => {
        return {success: response, message: 'Registration successful.'}
      }), catchError(err => {
        let message = 'An error occurred during registration.';
        if (err.status === 409) message = err.error;
        return of({success: false, message: message});
      })
    );
  }

  login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }
    return this.http.post<boolean>('/auth/login', body).pipe(
      map(response => {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', `${response}`)
        return {success: response, message: 'Login successful.'};
      }), catchError(err => {
        let message = 'An error occurred during login.';
        if (err.status === 404) message = 'Username not found.';
        if (err.status === 401) message = 'Incorrect password.';
        return of({success: false, message: message});
      })
    );
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.setItem('isLoggedIn', 'false');
  }

  isAuthenticated() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}
