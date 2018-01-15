import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';

import {ChartDefinition, ChartTypes, Sensor} from '../shared/data';
import {defaultSensors, invertColor} from '../shared/utils';

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

  currentChartDefinition = new ChartDefinition();

  ChartTypes = ChartTypes;

  constructor(private ref: ChangeDetectorRef) {
    this.sensors = defaultSensors;
    this.selectedSensor = this.sensors[0];
  }

  addSensor(): void {
    const index = this.currentChartDefinition.sensors.findIndex(
        s => this.selectedSensor.id === s.id);
    if (index === -1) {
      this.currentChartDefinition.sensors.push(this.selectedSensor);
    }
    this.ref.markForCheck();
  }

  private removeChip(sensor: Sensor): void {
    const index = this.currentChartDefinition.sensors.findIndex(s => sensor.id === s.id);
    if (index >= 0) {
      this.currentChartDefinition.sensors.splice(index, 1);
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
    this.currentChartDefinition.type = type;
  }

  isSensorPresent(): boolean {
    return this.currentChartDefinition.sensors.length > 0;
  }

  chartDefined(): void {
    this.defined.emit(this.currentChartDefinition);
  }

}
