import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDescriptionComponent } from './facility-description.component';

describe('FacilityDescriptionComponent', () => {
  let component: FacilityDescriptionComponent;
  let fixture: ComponentFixture<FacilityDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
