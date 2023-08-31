import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityImageManagerComponent } from './facility-image-manager.component';

describe('FacilityImageManagerComponent', () => {
  let component: FacilityImageManagerComponent;
  let fixture: ComponentFixture<FacilityImageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityImageManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityImageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
