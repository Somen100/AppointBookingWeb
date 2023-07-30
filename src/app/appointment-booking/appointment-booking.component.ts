import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import {  AcquaintanceDetails, Appointments, Profession,  Resources, Users } from '../models/model';
import { AuthService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
  ,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
    ]),
  ],
})
export class AppointmentBookingComponent implements OnInit {
  showAppointmentForm: boolean = false; // Add this flag variable
  selectedProfession: Profession | null = null;
  isStartTimeTouched = false;
  isEndTimeTouched = false;
  firstName:string='';
  isUserNameTouchedAndLeft = false;
  selectedResourceId: number | null = null; // Add this variable
  selectedResourceName:string='';
  userName: string = '';
  selectedDate: Date = new Date();; // Define the variable to store the selected appointment date

  selectedStartTime: Date = new Date(); // Hold the full DateTime value for the selected start time
selectedEndTime: Date = new Date(); // Hold the full DateTime value for the selected end time

  availableTimes: string[] = [];
  user:Users;
  userId:number=0;
  loggedinUserId:number=0;
  appointment:Appointments = new Appointments();
  appointmentList:Appointments[];
  acquaintanceDetails:AcquaintanceDetails[];
  professions: Profession[] = [
    {
      resourceId: 1,
      resourceName: 'Doctor',
      imageUrl: 'assets/doctor.png'
    },
    {
      resourceId: 2,
      resourceName: 'Teacher',
      imageUrl: 'assets/teacher.png'
    },
    {
      resourceId: 3,
      resourceName: 'Gym Trainer',
      imageUrl: 'assets/gymtrainer.png'
    },
    // Add more professions as needed
  ];

  constructor(private authService: AuthService, private appointmentService: AppointmentService,
    private datePipe: DatePipe, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    debugger;
     // Assuming you have a method to fetch the available acquaintances based on date and profession from the service
  
    let currentUserInfo = JSON.parse(
      localStorage.getItem('currentLoggedUser') || '{}'
    );
    this.loggedinUserId= currentUserInfo.userId;
   //this.firstName = JSON.parse( localStorage.getItem('firstName'));

    this.appointment.userId = JSON.parse(
      localStorage.getItem('userId') || '{}'
    );

    let selectedAppointmentDetailsRecord = JSON.parse(
      localStorage.getItem('selectedAppointmentDetailsRecord') || '{}'
    );
    var dateAvailabe = selectedAppointmentDetailsRecord.createdAt;

    let newDateFormate = this.datePipe.transform(dateAvailabe, 'yyyy-MM-dd');
    selectedAppointmentDetailsRecord.createdAt = newDateFormate;

    this.appointment = selectedAppointmentDetailsRecord;
    this.selectedProfession = this.professions.find(
      (profession) => profession.resourceId === selectedAppointmentDetailsRecord.resourceId
    );
    this.showAppointmentForm = selectedAppointmentDetailsRecord.appointmentId && selectedAppointmentDetailsRecord.appointmentId > 0;
    this.appointment.acquaintanceName = selectedAppointmentDetailsRecord.acquaintanceName;
 
    this.getAcquaintanceDetailsByType(selectedAppointmentDetailsRecord.resourceId);
    this.appointmentService.getAvailableAcquaintances(this.selectedDate, this.selectedProfession.resourceId)
    .subscribe((data: AcquaintanceDetails[]) => {
      console.log('Received Acquaintance Details:', data);
      this.acquaintanceDetails = data as [AcquaintanceDetails];
    });
  const startTime = new Date();
  startTime.setHours(10, 0, 0, 0);

  const endTime = new Date();
  endTime.setHours(17, 0, 0, 0);

  //this.getAllAppointments('');
  }


// ngoninit over/

  getAvailableTimes() {
    this.availableTimes = [];
    const startTime = new Date();
    startTime.setHours(10, 0, 0); // Set start time to 10:00 AM
    const endTime = new Date();
    endTime.setHours(17, 0, 0); // Set end time to 5:00 PM
  
    while (startTime < endTime) {
      // Push the formatted time string into the availableTimes array
      this.availableTimes.push(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
    }
  }

  loadAvailableAcquaintances() {
    debugger;
    if (this.selectedDate && this.selectedProfession) {
      // Assuming you have a method to fetch the available acquaintances based on date and profession from the service
      this.appointmentService.getAvailableAcquaintances(this.selectedDate, this.selectedProfession.resourceId)
        .subscribe((data: AcquaintanceDetails[]) => {
          console.log('Received Acquaintance Details:', data);
          this.acquaintanceDetails = data as [AcquaintanceDetails];
        });
    }
  }

  getAllAppointments(searchText: any){
    this.appointmentService.getAllAppointments(searchText).subscribe((res)=>{
      debugger;
      this.appointmentList = res as Appointments[];
    });
  }

  getAcquaintanceDetailsByType(id:number){
    debugger;
    this.appointmentService.getResourceDetailsByType(id).subscribe(
    (res)=>{
      debugger;
      this.acquaintanceDetails = res as AcquaintanceDetails[];
    }
    );
  }
  getAppointmentById(id:number){
    debugger;
    this.appointmentService.getResourceDetailsByType(id).subscribe(
    (res)=>{
      debugger;
      this.appointment = res as Appointments;
      this.appointment.createdAt = new Date(this.appointment.createdAt);

    }
    );
  }



validateUserName() {
  this.isUserNameTouchedAndLeft = true;
}


validateStartTime() {
  this.isStartTimeTouched = true;
}

validateEndTime() {
  this.isEndTimeTouched = true;
}
register() {
  debugger;
  if (!this.appointment.username || !this.appointment.createdAt || !this.appointment.startTime || !this.appointment.endTime) {
    this.showErrorToast('Please fill all required fields.');
    return;
  }

  let newDateFormatted = this.datePipe.transform(this.appointment.createdAt, 'yyyy-MM-dd');
  this.appointment.createdAt = newDateFormatted;

  // Convert the selectedDate to a Date object
  const selectedDate = new Date(this.selectedDate);

  this.appointment.userId = this.loggedinUserId;

  if (!this.appointment.appointmentId || this.appointment.appointmentId === 0) {
    // If appointmentId is null or 0, it means it's a new appointment, so create it.
    this.appointmentService.bookApppointment(this.appointment).subscribe(
      (response: any) => {
        this.appointment = response as Appointments;
       // this.appointment.resourceId = this.selectedResourceId;
       // this.appointment.resourceName = this.selectedResourceName;
        this.getAcquaintanceDetailsByType(this.appointment.resourceId);
        this.getAppointmentById( this.appointment.appointmentId);
        
        // Optionally, you can navigate to another page after successful registration
        this.showSuccessToast('Appointment booked successfully!');
      },
      (error: any) => {
        // Handle error if appointment save fails
        console.error('Appointment failed:', error);
        this.showErrorToast('Failed to book appointment. Please try again.');
      }
    );
  } else {
    // If appointmentId has a value, it means it's an existing appointment, so update it.
    this.appointmentService.bookApppointment(this.appointment).subscribe(
      (response: any) => {
        this.appointment = response as Appointments;
      //  this.appointment.resourceId = this.selectedResourceId;
      //  this.appointment.resourceName = this.selectedResourceName;
        this.getAcquaintanceDetailsByType(this.appointment.resourceId);
        this.getAppointmentById( this.appointment.appointmentId);
        // Optionally, you can navigate to another page after successful update
        this.showSuccessToast('Appointment updated successfully!');
      },
      (error: any) => {
        // Handle error if appointment update fails
        console.error('Appointment update failed:', error);
        this.showErrorToast('Failed to update appointment. Please try again.');
      }
    );
  }
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
  
  getUserByEmail(email:string){
    debugger;
    this.authService.getUserByEmail(email).subscribe((result) => {
      this.user = result as Users;
      this.userId = this.user.userId;
      this.appointment.userId = this.user.userId;
  });
}

selectProfession(profession: Profession) {
  debugger;
  this.selectedProfession = profession;
  this.selectedResourceId = profession.resourceId;
  this.selectedResourceName = profession.resourceName;
  this.appointment.resourceId = profession.resourceId;
  this.appointment.resourceName = profession.resourceName; // Set the resourceName in the appointment object

  this.getAcquaintanceDetailsByType(profession.resourceId);

}

  cancelAppointment() {
    // Cancel the appointment booking
    this.selectedProfession = null;
    this.userName = '';
    this.selectedDate = new Date();
    this.selectedStartTime = new Date();
    this.selectedEndTime = new Date();
  }
}
