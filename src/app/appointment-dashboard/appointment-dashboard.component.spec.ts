import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDashboardComponent } from './appointment-dashboard.component';

describe('AppointmentDashboardComponent', () => {
  let component: AppointmentDashboardComponent;
  let fixture: ComponentFixture<AppointmentDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentDashboardComponent]
    });
    fixture = TestBed.createComponent(AppointmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
