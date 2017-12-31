import {ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormControl } from '@angular/forms';

import {ChartsService} from './../services/charts.service';
import { ChartDefinition, Sensor, ChartTypes } from './../shared/data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styles: []
})
export class ChartComponent implements OnInit {
  @Input() chartDefinition: ChartDefinition;
  @Input() startDate: FormControl;
  @Input() endDate: FormControl;

  ChartTypes = ChartTypes;

  data = [];

  view: any[] = [500, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  colorScheme = {domain: []};

  constructor(private ref: ChangeDetectorRef, private service: ChartsService) {}

  ngOnInit() {
    this.setColorScheme(this.chartDefinition.sensors);
    this.service.getSensorsData(this.chartDefinition, this.startDate.value, this.endDate.value).then(sd => {
      this.data = sd;
      this.ref.markForCheck();
    });
  }

  private setColorScheme(sensors: Sensor[]) {
    sensors.forEach(sensor => this.colorScheme.domain.push(sensor.color));
  }
}
