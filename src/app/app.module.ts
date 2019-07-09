import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConvertToJSONComponent } from './convert-to-json/convert-to-json.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataTableComponent } from './data-table/data-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatFormFieldModule, MatInputModule, MatToolbarModule, 
  MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { GoogleChartModule } from './google-chart/google-chart.module';

@NgModule({
  declarations: [
    AppComponent,
    ConvertToJSONComponent,
    ViewDataComponent,
    NavigationComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    GoogleChartModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
