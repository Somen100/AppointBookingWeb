import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-master-component',
  templateUrl: './master-component.component.html',
  styleUrls: ['./master-component.component.css']
})
export class MasterComponentComponent {
  sideNavStatus: boolean = false;
  title = 'appointmentBooking';
  firstName:string='';
  constructor(private authService: AuthService) {}

  isAuthenticated = false;

  ngOnInit() {
    //this.firstName = JSON.parse( localStorage.getItem('firstName'));
    // Check if the user is authenticated (e.g., by checking for a valid token)
    this.isAuthenticated = this.isUserAuthenticated();
  }

  isUserAuthenticated(): boolean {
    return this.authService.isLoggedIn(); // For example, assuming you have a method named isLoggedIn() in AuthService that returns a boolean indicating if the user is logged in or not.
  }
}
