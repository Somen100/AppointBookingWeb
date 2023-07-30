import { Component } from '@angular/core';
import { Appointments } from '../models/model';
import { AuthService } from '../auth.service';
import { AppointmentService } from '../appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { TimeFormatPipe } from '../time-format.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-dashboard',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.css']
})
export class AppointmentDashboardComponent {
  appointment:Appointments = new Appointments();
  appointmentList:Appointments[];
  loggedinUserId:number=0;
  searchedText:string= '';

  constructor(private router: Router,private authService: AuthService, private appointmentService: AppointmentService,
    private datePipe: DatePipe, private snackBar: MatSnackBar ) {}

    ngOnInit(): void {
      debugger;
      let currentUserInfo = JSON.parse(
        localStorage.getItem('currentLoggedUser') || '{}'
      );
      
      this.loggedinUserId= currentUserInfo.userId;
        this.getAllAppointments('');
      }  

      getAllAppointments(data:any){
        this.appointmentService.getAllAppointments(data).subscribe((res)=>{
          debugger;
          this.appointmentList = res as Appointments[];
        });
      }

      getAppointmentById(appointmentId:number){
        debugger;
     this.appointmentService.getAppointmentById(appointmentId)
        .subscribe((result)=>{
          this.appointment = result as Appointments;
        });
      }
      showAppointmentForm: boolean = false; 
      openEditPopup(a: Appointments) {
        debugger;
        localStorage.setItem('selectedAppointmentDetailsRecord', JSON.stringify(a));
        this.router.navigate(['/admin/appointment-booking']);
        this.showAppointmentForm = true; // Set the flag to show the Appointment Form
      }
      

      deleteAppointment(id:number){
        debugger;
        this.appointmentService.deleteAppointment(id).subscribe(
          (res)=>{
            this.getAllAppointments('');
            this.showSuccessToast('Appointment cancelled successfully!');
          }
        );
          }

          
  showSuccessToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Set the duration for how long the toast should be visible (in milliseconds)
      panelClass: ['success-toast'], // CSS class for styling the toast
      horizontalPosition: 'end', // Set the horizontal position of the toast (center, start, end, left, right)
      verticalPosition: 'top', // Set the vertical position of the toast (top, bottom)
    });
  }
  
  showErrorToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-toast'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
