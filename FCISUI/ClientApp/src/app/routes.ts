import { ApfPortfolioAllDashboardComponent } from './apf-portfolio-all-dashboard/apf-portfolio-all-dashboard.component';
import { ErrorLogDashboardComponent } from './error-log-dashboard/error-log-dashboard.component';
import { FacilityLayoutComponent } from './facility-layout/facility-layout.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { StaticContentPageComponent } from './static-content-page/static-content-page.component';

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
        path: 'facility-all/:portfolio',
        component: FacilityLayoutComponent
      },
      {
        path: 'facility/:facilityId',
        component: FacilityLayoutComponent
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
  { path: 'error-log', component: ErrorLogDashboardComponent }
];
