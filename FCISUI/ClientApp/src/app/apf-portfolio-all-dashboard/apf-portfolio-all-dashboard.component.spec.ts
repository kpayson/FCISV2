import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApfPortfolioAllDashboardComponent } from './apf-portfolio-all-dashboard.component';

describe('ApfPortfolioAllDashboardComponent', () => {
  let component: ApfPortfolioAllDashboardComponent;
  let fixture: ComponentFixture<ApfPortfolioAllDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApfPortfolioAllDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApfPortfolioAllDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
