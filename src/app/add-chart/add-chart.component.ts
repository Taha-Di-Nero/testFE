import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';

import {ChartDefinition, ChartTypes, Sensor} from '../shared/data';
import {getDefaultSensors, invertColor} from '../shared/utils';

@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddChartComponent {
  @Output() defined: EventEmitter<ChartDefinition> = new EventEmitter();

  sensors: Sensor[];
  selectedSensor: Sensor;

  chartDefToAdd = new ChartDefinition();

  ChartTypes = ChartTypes;

  constructor(private ref: ChangeDetectorRef) {
    this.sensors = getDefaultSensors();
    this.selectedSensor = this.sensors[0];
  }

  addSensor(): void {
    const index = this.chartDefToAdd.sensors.findIndex(
        s => this.selectedSensor.id === s.id);
    if (index === -1) {
      this.chartDefToAdd.sensors.push(this.selectedSensor);
    }
    this.ref.markForCheck();
  }

  private removeChip(sensor: Sensor): void {
    const index = this.chartDefToAdd.sensors.findIndex(s => sensor.id === s.id);
    if (index >= 0) {
      this.chartDefToAdd.sensors.splice(index, 1);
    }
    this.ref.markForCheck();
  }

  private getChipColor(sensor: Sensor): string {
    return sensor.color;
  }

  private getChipTextColor(sensor: Sensor): string {
    return invertColor(sensor.color);
  }

  onTypeSelectionChange(type: ChartTypes): void {
    this.chartDefToAdd.type = type;
  }

  isSensorPresent(): boolean {
    return this.chartDefToAdd.sensors.length > 0;
  }

  chartDefined(): void {
    this.defined.emit(this.chartDefToAdd);
  }

}
