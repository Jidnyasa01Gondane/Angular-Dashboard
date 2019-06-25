import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvertToJSONComponent } from './convert-to-json/convert-to-json.component';
import { ViewDataComponent } from './view-data/view-data.component';

const routes: Routes = [
  {path: 'convertJSON', component: ConvertToJSONComponent},
  {path: 'data', component:ViewDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
