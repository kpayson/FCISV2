import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityAllMapComponent } from './facility-all-map.component';

describe('FacilityAllMapComponent', () => {
  let component: FacilityAllMapComponent;
  let fixture: ComponentFixture<FacilityAllMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityAllMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityAllMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
