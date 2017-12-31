import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { AddChartModule } from './add-chart/add-chart.module';
import { ChartModule } from './chart/chart.module';
import { AddChartComponent } from './add-chart/add-chart.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    AddChartModule,
    ChartModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddChartComponent
  ]
})
export class AppModule { }
