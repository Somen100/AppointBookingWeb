// login-register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel, Users } from '../models/model';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from '../shared-data.service';
import { NavigationStart } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  showLogin: boolean = true;
  loggedInUser: any | Users;
  loginInfo: LoginModel = new LoginModel();
  registerInfo: Users = new Users();
  logInNow: LoginModel = new LoginModel();
  user:Users = new Users();
  constructor(private authService: AuthService, private router: Router,
    private snackBar: MatSnackBar, private resourceService:ResourceService,
    private sharedDataService: SharedDataService) {}

    ngOnInit(): void {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          // Check if the user is navigating to the login URL
          if (event.url === '/login-register') {
            // Clear the localStorage when navigating to the login URL
            localStorage.clear();
          }
        }
      });
    }
    
  login() {
    debugger;
    let loginDetails = new LoginModel();
    loginDetails.email = this.logInNow.email
    loginDetails.password = this.logInNow.password;
    

    this.authService.loginUser(loginDetails).subscribe(
      (response: any) => {
        debugger;
        this.loggedInUser = response;
        localStorage.setItem('currentLoggedUser', JSON.stringify(this.loggedInUser));
        // Assuming the response contains a property 'token' that holds the actual token
        const token = response.token;
        const userId = response.userId;
        const userEmail = response.email;
        const firstName = response.firstName;
        // Store the access token in the localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('firstName', firstName);

        this.sharedDataService.setFirstName(firstName); // Set the firstName in the shared service
        // Set the user's token in the AuthService
       // this.authService.setToken(token);
      
        // Optionally, you can navigate to another page after successful login
        this.router.navigate(['/admin/appointment-booking']);
        // this.router.navigate(['/appointment-booking']);
      },
      (error: any) => {
        // Handle error if login fails
        console.error('Login failed:', error);
      }
    );
  }
  showSuccessToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 1000, // Set the duration for how long the toast should be visible (in milliseconds)
      panelClass: ['success-toast'], // CSS class for styling the toast
      horizontalPosition: 'end', // Set the horizontal position of the toast (center, start, end, left, right)
      verticalPosition: 'top', // Set the vertical position of the toast (top, bottom)
    });
  }
  
  showErrorToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 1000,
      panelClass: ['error-toast'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  register() {
    debugger
    this.resourceService.addUser(this.registerInfo).subscribe(
      (response: any) => {
  
  this.user = response as Users;
  this.showSuccessToast('User Registered successfully!');
        // Assuming the response contains a property 'token' that holds the actual token
        const token = response.token;
        // Store the access token in the localStorage
        localStorage.setItem('token', token);
        // Set the user's token in the AuthService
        this.authService.setToken(token);
        // Optionally, you can navigate to another page after successful registration
        this.router.navigate(['/appointment-booking']);
      },
      (error: any) => {
        // Handle error if registration fails
        this.showErrorToast('Some Error Occured, Login Failure! Please verify your credentials!')
        console.error('Registration failed:', error);
      }
    );
  }
}

////////////





