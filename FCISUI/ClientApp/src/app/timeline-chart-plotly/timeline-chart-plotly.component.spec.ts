import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineChartPlotlyComponent } from './timeline-chart-plotly.component';

describe('TimelineChartPlotlyComponent', () => {
  let component: TimelineChartPlotlyComponent;
  let fixture: ComponentFixture<TimelineChartPlotlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineChartPlotlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineChartPlotlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
