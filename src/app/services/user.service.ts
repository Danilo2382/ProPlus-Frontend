import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import {AppConstants} from "../constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserDetails() { return this.http.get<User>(AppConstants.USER_SHOW_API_URL); }

  changeUserInfo(type: 'Username' | 'Email' | 'Password', newValue: string) {
    return this.http.patch<{message: string}>(AppConstants.USER_CHANGE_API_URL + type, {property: newValue});
  }
}
