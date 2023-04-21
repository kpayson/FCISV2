import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogDashboardComponent } from './error-log-dashboard.component';

describe('ErrorLogDashboardComponent', () => {
  let component: ErrorLogDashboardComponent;
  let fixture: ComponentFixture<ErrorLogDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorLogDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorLogDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
