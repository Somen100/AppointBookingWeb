import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AcquaintanceDetails, Appointments } from './models/model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  endPointURL: string = environment.apiUrl;
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getAppointmentUrl:string='Appointment';
  getByIdAppointmentUrl:string='Appointment';
  postAppointmentUrl:string='Appointment';
  updateAppointmentUrl:string='Appointment';
  deleteAppointmentUrl:string='Appointment';
  getResourceDetailsByTypeUrl:string='Appointment/GetResourceDetailsByType';
  getAvailableAcquaintancesUrl:string='Appointment/available-acquaintances';


  deleteAppointment(id:number){
    const url = `${this.endPointURL}${this.deleteAppointmentUrl}/${id}`;
    return this.http.delete(url);
  }
  bookApppointment(appointment: Appointments) {
    const url = `${this.endPointURL}${this.postAppointmentUrl}`;
    return this.http.post(url, appointment);
  }
  getAllAppointments(searchText: any){
    const url = `${this.endPointURL}${this.getAppointmentUrl}?searchText=${searchText}`;
    return this.http.get(url);
  }

  getAppointmentById(id: number){
    const url = `${this.endPointURL}${this.getAppointmentUrl}/${id}`;
    return this.http.get(url);
  }

  getResourceDetailsByType(type: number) {
    const url = `${this.endPointURL}${this.getResourceDetailsByTypeUrl}/${type}`;
    return this.http.get(url);
  } 

  getAvailableAcquaintances(selectedDate: Date, professionType: number) {
    const url = `${this.endPointURL}${this.getAvailableAcquaintancesUrl}?selectedDate=${selectedDate}&professionType=${professionType}`;
    return this.http.get<AcquaintanceDetails[]>(url);
  }
}
