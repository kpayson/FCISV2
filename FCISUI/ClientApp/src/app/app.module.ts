import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApfMonitoredRoomsChartComponent } from './apf-monitored-rooms-chart/apf-monitored-rooms-chart.component';
import { ApfPortfolioAllDashboardComponent } from './apf-portfolio-all-dashboard/apf-portfolio-all-dashboard.component';
import { ApfPortfolioIcDashboardComponent } from './apf-portfolio-ic-dashboard/apf-portfolio-ic-dashboard.component';
import { ApfPortfolioIcMapComponent } from './apf-portfolio-ic-map/apf-portfolio-ic-map.component';
import { ApfPortfolioMapComponent } from './apf-portfolio-all-map/apf-portfolio-all-map.component';
import { ApfTimelineChartComponent } from './apf-timeline-chart/apf-timeline-chart.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartDemoComponent } from './chart-demo/chart-demo.component';
import { ContactUsDialogComponent } from './contact-us-dialog/contact-us-dialog.component';
import { DataService } from 'src/app/api/data.service';
import { ErrorLogDashboardComponent } from './error-log-dashboard/error-log-dashboard.component';
import { FacilityInfoPageComponent } from './facility-info-page/facility-info-page.component';
import { FormulaHeaderComponent } from './formula-header/formula-header.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { GsfGrowthByClassificationChartComponent } from './gsf-growth-by-classification-chart/gsf-growth-by-classification-chart.component';
import { GsfPieChartComponent } from './gsf-pie-chart/gsf-pie-chart.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NgModule } from '@angular/core';
import { NihLogoHeaderComponent } from './nih-logo-header/nih-logo-header.component';
import { PiDataFilterToolbarComponent } from './pi-data-filter-toolbar/pi-data-filter-toolbar.component';
import { RoomDataTableComponent } from './room-data-table/room-data-table.component';
import { RoomInfoDisplayComponent } from './room-info-display/room-info-display.component';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from './safe-url.pipe'
import { SanitizedHtmlPipe } from './sanitized-html.pipe';
import { StaticContentContainerComponent } from './static-content-container/static-content-container.component';
import { StaticContentEditorComponent } from './static-content-editor/static-content-editor.component';
import { StaticContentPageComponent } from './static-content-page/static-content-page.component';
import { SvgStatusMapComponent } from './svg-status-map/svg-status-map.component';
import { ThirdPartyComponentsModule } from './3rd-party-components/3rd-party-components.module';
import { appRoutes } from './routes';
import { FacilityLayoutComponent } from './facility-layout/facility-layout.component';
import { FacilityDescriptionComponent } from './facility-description/facility-description.component';
import { FacilityAllMapComponent } from './facility-all-map/facility-all-map.component';
import { FcisResourcesComponent } from './fcis-resources/fcis-resources.component';

// import { DataService } from './data.service';

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
    SafeUrlPipe,
    StaticContentContainerComponent,
    SvgStatusMapComponent,
    StaticContentEditorComponent,
    RoomInfoDisplayComponent,
    RoomDataTableComponent,
    ErrorLogDashboardComponent,
    LeftNavComponent,
    FacilityInfoPageComponent,
    ContactUsDialogComponent,
    StaticContentPageComponent,
    FacilityLayoutComponent,
    FacilityDescriptionComponent,
    FacilityAllMapComponent,
    FcisResourcesComponent
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
