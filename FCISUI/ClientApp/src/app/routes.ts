import { ApfPortfolioAllDashboardComponent } from './apf-portfolio-all-dashboard/apf-portfolio-all-dashboard.component';
import { ErrorLogDashboardComponent } from './error-log-dashboard/error-log-dashboard.component';
import { FacilityLayoutComponent } from './facility-layout/facility-layout.component';
import { FcisResourcesComponent } from './fcis-resources/fcis-resources.component';
import { HomeComponent } from './home/home.component';
import { PiWebapiDemoComponent } from './pi-webapi-demo/pi-webapi-demo.component';
import { PortfolioDashboardComponent } from './portfolio-dashboard/portfolio-dashboard.component';
import { Routes } from '@angular/router';
import { SopsComponent } from './sops/sops.component';
import { StaticContentPageComponent } from './static-content-page/static-content-page.component';
import { TimelineChartNextComponent } from './timeline-chart-next/timeline-chart-next.component';
import {TimelineChartPlotlyComponent} from './timeline-chart-plotly/timeline-chart-plotly.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'apf-portfolio',
        component: ApfPortfolioAllDashboardComponent
      },
      // {
      //   path: 'apf-portfolio/:ic',
      //   component: ApfPortfolioIcDashboardComponent
      // },
      {
        path: 'facility-all/:portfolioId',
        component: PortfolioDashboardComponent //FacilityLayoutComponent
      },
      {
        path: 'facility/:facilityId',
        component: FacilityLayoutComponent
      },
      {
        path: 'sops',
        component: SopsComponent
      },
      {
        path:'resources',
        component: FcisResourcesComponent
      },
      {
        path: 'resource/:page',
        component: StaticContentPageComponent
      },
      {
        path: '',
        component: ApfPortfolioAllDashboardComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'error-log', component: ErrorLogDashboardComponent },
  { path: 'webapi-demo', component:PiWebapiDemoComponent},
  { path: 'd3Timeline', component: TimelineChartNextComponent},
  { path: 'plotlyTimeline', component: TimelineChartPlotlyComponent}
];
