import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from './service/service.module';
import { PiechartComponent } from './piechart/piechart.component';
import {  DashboardComponent } from '../google-chart/dashboard/dashboard.component';

import { MatCardModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { OverviewComponent } from './overview/overview.component';
import { BarchartComponent } from './barchart/barchart.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    PiechartComponent,
    DashboardComponent, 
    OverviewComponent, 
    BarchartComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    ServiceModule
  ],
  exports: [ 
    PiechartComponent,
    DashboardComponent,
    OverviewComponent
  ],
  providers : []
})
export class GoogleChartModule { }
