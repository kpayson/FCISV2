import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { ApfPortfolioAllDashboardComponent } from "./apf-portfolio-all-dashboard/apf-portfolio-all-dashboard.component";
import { HomeComponent } from "./home/home.component";

export const appRoutes: Routes = [
    {
        path:'home',
        component: HomeComponent,
        children:[
            {
                path:'apf-portfolio-all',
                component:ApfPortfolioAllDashboardComponent
            },
            //{
            //     path:'apf-portfolio-ic',
            //     component:ApfPortfolioICDashboardComponent
            // },
            {
                path:'',
                
                component:ApfPortfolioAllDashboardComponent
            }
        ]
    }
]

// {
//     path: 'tenants/:name',
//     component: TenantDashboardComponent,
//     resolve: {
//         tenant: TenantResolverService,
//         tenants: TenantsResolverService
//     },
//     canActivate: [AuthTenantGuardService],
//     children: [
//         {
//             path: 'details',
//             component: TenantDetailsComponent,
//             data: {
//                 section: 'Tenant'
//             }
//         },
//         {
//             path: 'apps',
//             component: ClientDashboardComponent
//         },