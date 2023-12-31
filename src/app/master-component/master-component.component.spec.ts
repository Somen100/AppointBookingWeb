import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterComponentComponent } from './master-component.component';

describe('MasterComponentComponent', () => {
  let component: MasterComponentComponent;
  let fixture: ComponentFixture<MasterComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterComponentComponent]
    });
    fixture = TestBed.createComponent(MasterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
