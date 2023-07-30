import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar-component.component.html',
  styleUrls: ['./sidebar-component.component.css']
})
export class SidebarComponentComponent {
  isSidebarOpen: boolean = false;
  selectedProfession: string | null = null; // Initialize it as null or with the appropriate type

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
