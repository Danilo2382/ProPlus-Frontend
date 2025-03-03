import {Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, map, of, tap} from "rxjs";
import {User} from "../models/user";
import {AppConstants} from "../constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post<{message: string}>(AppConstants.REGISTER_API_URL, user).pipe(
      map(response => ({
        success: true,
        message: response.message
      })),
      catchError(err => of({
        success: false,
        message: err.error?.message || "Registration failed"
      }))
    );
  }

  login(username: string, password: string) {
    return this.http.post<{jwt: string}>(AppConstants.LOGIN_API_URL, {username, password}).pipe(
      tap(response => sessionStorage.setItem("JWT", response.jwt)),
      map(() => ({
        success: true,
        message: 'Login successful'
      })),
      catchError(err => of({
        success: false,
        message: err.error?.message || "Login failed",
      }))
    );
  }

  isAuthenticated() {
    return sessionStorage.getItem("JWT") != null;
  }

  logout() {
    sessionStorage.removeItem("JWT");
  }

}
