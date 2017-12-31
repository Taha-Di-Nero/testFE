import { NgModule } from '@angular/core';

import {NgxChartsModule} from '@swimlane/ngx-charts';

import { ChartComponent } from './chart.component';
import { ChartsService } from '../services/charts.service';

@NgModule({
  imports: [
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
