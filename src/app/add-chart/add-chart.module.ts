import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ColorPickerModule } from 'ngx-color-picker';

import { MaterialModule } from '../shared/material.module';
import { AddChartComponent } from './add-chart.component';


@NgModule({
  declarations: [
    AddChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    MaterialModule
  ],
   exports: [
    AddChartComponent
  ]
})
export class AddChartModule { }
