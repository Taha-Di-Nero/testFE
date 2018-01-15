import { NgModule } from '@angular/core';

import {NgxChartsModule} from '@swimlane/ngx-charts';

import { ChartComponent } from './chart.component';
import { ChartsService } from '../services/charts.service';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    MaterialModule,
    NgxChartsModule
  ],
  declarations: [
    ChartComponent
  ],
  exports: [
    ChartComponent
  ],
  providers: [
    ChartsService
  ]
})

export class ChartModule {}
