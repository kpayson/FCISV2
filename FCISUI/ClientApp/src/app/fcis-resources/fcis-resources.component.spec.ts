import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcisResourcesComponent } from './fcis-resources.component';

describe('FcisResourcesComponent', () => {
  let component: FcisResourcesComponent;
  let fixture: ComponentFixture<FcisResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcisResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcisResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
