import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel, Users } from '../models/model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginInfo: LoginModel = new LoginModel();
  loggedInUser: any | Users;
  public loginError: String;
  LogInNow: LoginModel = new LoginModel();
  constructor(private authService:AuthService,  private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  loginClicked() {

    if(!this.LogInNow.email || !this.LogInNow.password){
      // this.notifyService.showError(
      //   'Please enter user name and password',
      //   'Failed'
      // );
      return;
    }
    debugger;
   //this.SpinnerService.show();
    console.log(this.loginForm);
    let loginDetails = new LoginModel();
    loginDetails.email = this.LogInNow.email
    loginDetails.password = this.LogInNow.password;

    this.authService.loginUser(loginDetails).subscribe((res:any) => {
      //console.log(res)
      this.loggedInUser = res;
      if (res > 0) {
      localStorage.clear();
      const token = res.token;
      localStorage.setItem('currentLoggedUser', JSON.stringify(res));

      let currentUserInfo = JSON.parse(localStorage.getItem("currentLoggedUser")|| '{}');
      localStorage.setItem('token', token);
     
      this.router.navigate(['/admin/appointment-booking']);
      window.location.reload();
      }
      else {
       // alert('Login Unsuccessfull');
      //  this.notifyService.showError(
      //   'Incorrect user name or password',
      //   'Failed'
      // );
     
      }
    },err => {
     // alert('Login Unsuccessfull');
    //  this.notifyService.showError(
    //   'Incorrect user name or password',
    //   'Failed'
    // );
  
  });
  }


  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

}
