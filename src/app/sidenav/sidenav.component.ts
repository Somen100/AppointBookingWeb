import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() sideNavStatus:boolean = false;

list=[
  {
    number:'1',
    name:'Home',
    icon:'fa-solid fa-house',
    routerLink:'/login-register'
  },
  {
    number:'2',
    name:'Appointment Dashboard',
    icon:'fa-solid fa-meetup',
    routerLink:'/admin/appointmentDashboard'
  },
  {
    number:'3',
    name:'About',
    icon:'fa-solid fa-address-book',
    routerLink:'/admin/appointmentDashboard'
  }
]
}
