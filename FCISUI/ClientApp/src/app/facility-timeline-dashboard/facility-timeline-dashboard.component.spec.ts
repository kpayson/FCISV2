import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityTimelineDashboardComponent } from './facility-timeline-dashboard.component';

describe('FacilityTimelineDashboardComponent', () => {
  let component: FacilityTimelineDashboardComponent;
  let fixture: ComponentFixture<FacilityTimelineDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityTimelineDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityTimelineDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
