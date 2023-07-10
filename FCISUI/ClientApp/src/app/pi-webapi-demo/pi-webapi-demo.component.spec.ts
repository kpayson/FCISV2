import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiWebapiDemoComponent } from './pi-webapi-demo.component';

describe('PiWebapiDemoComponent', () => {
  let component: PiWebapiDemoComponent;
  let fixture: ComponentFixture<PiWebapiDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiWebapiDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiWebapiDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
