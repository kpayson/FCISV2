import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ThirdPartyComponentsModule } from './3rd-party-components/3rd-party-components.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { ApfMonitoredRoomsChartComponent } from './apf-monitored-rooms-chart/apf-monitored-rooms-chart.component';
import { ApfPortfolioAllDashboardComponent } from './apf-portfolio-all-dashboard/apf-portfolio-all-dashboard.component';
import { ApfPortfolioMapComponent } from './apf-portfolio-all-map/apf-portfolio-all-map.component';
import { ApfPortfolioIcDashboardComponent } from './apf-portfolio-ic-dashboard/apf-portfolio-ic-dashboard.component';
import { ApfPortfolioIcMapComponent } from './apf-portfolio-ic-map/apf-portfolio-ic-map.component';
import { ApfTimelineChartComponent } from './apf-timeline-chart/apf-timeline-chart.component';
import { PiDataFilterToolbarComponent} from './pi-data-filter-toolbar/pi-data-filter-toolbar.component';
import { AppComponent } from './app.component';
import { ChartDemoComponent } from './chart-demo/chart-demo.component';
import { FormulaHeaderComponent } from './formula-header/formula-header.component';
import { GsfGrowthByClassificationChartComponent } from './gsf-growth-by-classification-chart/gsf-growth-by-classification-chart.component';
import { GsfPieChartComponent } from './gsf-pie-chart/gsf-pie-chart.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NihLogoHeaderComponent } from './nih-logo-header/nih-logo-header.component';
import { appRoutes } from './routes';
import { StaticContentContainerComponent } from './static-content-container/static-content-container.component';
import { SvgStatusMapComponent } from './svg-status-map/svg-status-map.component';
import { SanitizedHtmlPipe } from './sanitized-html.pipe';
//import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NihLogoHeaderComponent,
    FormulaHeaderComponent,
    ApfPortfolioMapComponent,
    GsfPieChartComponent,
    ChartDemoComponent,
    ApfPortfolioAllDashboardComponent,
    GsfGrowthByClassificationChartComponent,
    ApfPortfolioIcDashboardComponent,
    ApfPortfolioIcMapComponent,
    ApfTimelineChartComponent,
    ApfMonitoredRoomsChartComponent,
    PiDataFilterToolbarComponent,
    SanitizedHtmlPipe,
    StaticContentContainerComponent,
    SvgStatusMapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    ThirdPartyComponentsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
