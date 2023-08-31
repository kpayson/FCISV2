import { ApfPortfolioAllDashboardComponent } from './apf-portfolio-all-dashboard/apf-portfolio-all-dashboard.component';
import { ErrorLogDashboardComponent } from './error-log-dashboard/error-log-dashboard.component';
import { FacilityLayoutComponent } from './facility-layout/facility-layout.component';
import { FcisResourcesComponent } from './fcis-resources/fcis-resources.component';
import { HomeComponent } from './home/home.component';
import { PortfolioDashboardComponent } from './portfolio-dashboard/portfolio-dashboard.component';
import { Routes } from '@angular/router';
import { SopsComponent } from './sops/sops.component';
import { StaticContentPageComponent } from './static-content-page/static-content-page.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './shared/auth/auth.guard';

// function adminGuard() {
//   return true;
// }

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
  {
    path: 'admin',
    component: AdminHomeComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'user-dashboard',
        component: UserDashboardComponent,
      },
    ]
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'error-log', component: ErrorLogDashboardComponent },

];
