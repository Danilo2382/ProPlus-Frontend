import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserDetails() {
    return this.http.get<User>('/user/showDetails');
  }

  changeUserInfo(type: 'Username' | 'Email' | 'Password', newValue: string) {
    const endpoint = `/user/change${type}`;
    const body = { info: newValue};
    return this.http.put<{userDto: User, message: string}>(endpoint, body);
  }
}
