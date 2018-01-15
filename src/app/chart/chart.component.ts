import {ChangeDetectionStrategy, Component, Input, Output, OnInit, ChangeDetectorRef, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';

import {ChartsService} from './../services/charts.service';
import { ChartDefinition, Sensor, ChartTypes } from './../shared/data';
import { MatDialog } from '@angular/material';
import { AddChartComponent } from '../add-chart/add-chart.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styles: []
})
export class ChartComponent implements OnInit {

  @Input() chartDefinition: ChartDefinition;
  @Input() startDate: FormControl;
  @Input() endDate: FormControl;

  @Output() remove = new EventEmitter<ChartDefinition>();

  ChartTypes = ChartTypes;

  data = [];

  view: any[] = [750, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  groupPadding = 2;
  barPadding = 0;

  colorScheme = {domain: []};

  constructor(private ref: ChangeDetectorRef, private service: ChartsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.setColorScheme(this.chartDefinition.sensors);
    this.service.getSensorsData(this.chartDefinition, this.startDate.value, this.endDate.value).then(sd => {
      this.data = sd;
      this.ref.markForCheck();
    });
  }

  private setColorScheme(sensors: Sensor[]) {
    this.colorScheme.domain.length = 0;
    sensors.forEach(sensor => this.colorScheme.domain.push(sensor.color));
  }

  editChartForm(): void {
    const editChartDialog = this.dialog.open(AddChartComponent, {disableClose: true});
    editChartDialog.componentInstance.currentChartDefinition = this.chartDefinition;
    editChartDialog.componentInstance.selectedSensor = this.chartDefinition.sensors[0];
    const addChartSubscription = editChartDialog.componentInstance.defined.subscribe(def => {
      this.ngOnInit();
    });
    editChartDialog.afterClosed().subscribe(() => {
      addChartSubscription.unsubscribe();
    });
  }

  removeMe() {
    this.remove.emit(this.chartDefinition);
  }
}
