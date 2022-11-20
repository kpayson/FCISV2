import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { ApfPortfolioAllDashboardComponent } from "./apf-portfolio-all-dashboard/apf-portfolio-all-dashboard.component";
import { ApfPortfolioIcDashboardComponent } from "./apf-portfolio-ic-dashboard/apf-portfolio-ic-dashboard.component";
import { HomeComponent } from "./home/home.component";

export const appRoutes: Routes = [
    {
        path:'home',
        component: HomeComponent,
        children:[
            {
                path:'apf-portfolio/all',
                component:ApfPortfolioAllDashboardComponent
            },
            {
                path:'apf-portfolio/:ic',
                component:ApfPortfolioIcDashboardComponent
            },
            {
                path:'',
                component:ApfPortfolioAllDashboardComponent
            },          
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }

]

