import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  firstName:string='';
  
  @Output() sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  menuStatus:boolean=false;
  constructor(private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.sharedDataService.getFirstName().subscribe((firstName) => {
      this.firstName = firstName;
    });
  
    debugger;
    console.log(this.firstName);
  }

  SideNavToggled(){
    this.menuStatus = !this.menuStatus;
  this.sideNavToggled.emit(this.menuStatus);
  }
}
