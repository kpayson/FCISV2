import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityInfoPageComponent } from './facility-info-page.component';

describe('FacilityInfoPageComponent', () => {
  let component: FacilityInfoPageComponent;
  let fixture: ComponentFixture<FacilityInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
