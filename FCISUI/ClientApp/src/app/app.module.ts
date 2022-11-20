import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { NihLogoHeaderComponent } from './nih-logo-header/nih-logo-header.component';
import { FormulaHeaderComponent } from './formula-header/formula-header.component';
import { LegacyPageImportComponent } from './legacy-page-import/legacy-page-import.component';
import { ApfPortfolioMapComponent } from './apf-portfolio-all-map/apf-portfolio-all-map.component';
import { GsfPieChartComponent } from './gsf-pie-chart/gsf-pie-chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartDemoComponent } from './chart-demo/chart-demo.component';
import { ApfPortfolioAllDashboardComponent } from './apf-portfolio-all-dashboard/apf-portfolio-all-dashboard.component';
import {appRoutes} from './routes';
import { GsfGrowthByClassificationChartComponent } from './gsf-growth-by-classification-chart/gsf-growth-by-classification-chart.component';
import { ApfPortfolioIcDashboardComponent } from './apf-portfolio-ic-dashboard/apf-portfolio-ic-dashboard.component';
import { ApfPortfolioIcMapComponent } from './apf-portfolio-ic-map/apf-portfolio-ic-map.component';
import { ApfTimelineChartComponent } from './apf-timeline-chart/apf-timeline-chart.component';
//import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NihLogoHeaderComponent,
    FormulaHeaderComponent,
    LegacyPageImportComponent,
    ApfPortfolioMapComponent,
    GsfPieChartComponent,
    ChartDemoComponent,
    ApfPortfolioAllDashboardComponent,
    GsfGrowthByClassificationChartComponent,
    ApfPortfolioIcDashboardComponent,
    ApfPortfolioIcMapComponent,
    ApfTimelineChartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
