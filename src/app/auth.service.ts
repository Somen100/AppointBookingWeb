import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { LoginModel } from './models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPointURL: string = environment.apiUrl;
  userLogin: string = 'User/login';
  getUserByEmailUrl:string= 'User/GetUserByEmail';
  token: string = ''; // Property to store the user's token

  constructor(private http: HttpClient) {}

  loginUser(loginInfo: LoginModel) {
    const url = `${this.endPointURL}${this.userLogin}`;
    return this.http.post(url, loginInfo);
  }
  getUserByEmail(email:string){
    const url = `${this.endPointURL}${this.getUserByEmailUrl}`;
    return this.http.get(url);
  }
  // Method to set the user's token after successful login
  setToken(token: string) {
    this.token = token;
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    // Retrieve the token from the localStorage
    const token = localStorage.getItem('token');

    // Check if the token is present (logged in) or not (not logged in)
    return !!token;
  }
}
