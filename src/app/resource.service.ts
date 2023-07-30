import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from './models/model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  endPointURL: string = environment.apiUrl;
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }



  getResourcementUrl:string='Resource';
  getByIdResourceUrl:string='Resource';
  postResourceUrl:string='Resource';
  updateResourceUrl:string='Resource';
  deleteResourceUrl:string='Resource';

  getUserUrl:string='User';
  getByIdUserUrl:string='User';
  postUserUrl:string='User';
  updateUserUrl:string='User';
  deleteUserUrl:string='User';
  
  addUser(user: Users) {
    const url = `${this.endPointURL}${this.postUserUrl}`;
    return this.http.post(url, user);
  }

}
