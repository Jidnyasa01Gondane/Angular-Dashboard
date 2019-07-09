import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvertToJSONComponent } from './convert-to-json/convert-to-json.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { DashboardComponent } from './google-chart/dashboard/dashboard.component';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  {path: 'convertJSON', component: ConvertToJSONComponent},
  {path: 'data', component:ViewDataComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'datadisplay', component:DataTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
