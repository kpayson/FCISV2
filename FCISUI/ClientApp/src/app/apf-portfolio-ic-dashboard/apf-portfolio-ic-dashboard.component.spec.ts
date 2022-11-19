import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApfPortfolioIcDashboardComponent } from './apf-portfolio-ic-dashboard.component';

describe('ApfPortfolioIcDashboardComponent', () => {
  let component: ApfPortfolioIcDashboardComponent;
  let fixture: ComponentFixture<ApfPortfolioIcDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApfPortfolioIcDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApfPortfolioIcDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
