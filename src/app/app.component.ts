import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent, MatDialog} from '@angular/material';

import {addDays, subDays, startOfMonth} from 'date-fns';

import {ChartDefinition} from './shared/data';
import {getDefaultChartDefinitions} from './shared/utils';
import { AddChartComponent } from './add-chart/add-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  startDate = new FormControl(startOfMonth(new Date()));
  endDate = new FormControl(addDays(startOfMonth(new Date()), 15));

  chartDefinitions: ChartDefinition[];

  constructor(private ref: ChangeDetectorRef, public dialog: MatDialog) {
    this.chartDefinitions = getDefaultChartDefinitions();
  }

  ngOnInit(): void {}

  showAddChartForm(): void {
    const addChartDialog = this.dialog.open(AddChartComponent, {disableClose: true});
    const addChartSubscription = addChartDialog.componentInstance.defined.subscribe(def => {
      this.addChartDefintion(def);
    });
    addChartDialog.afterClosed().subscribe(() => {
      addChartSubscription.unsubscribe();
    });
  }

  private addChartDefintion(chartDefinition: ChartDefinition): void {
    this.chartDefinitions.push(chartDefinition);
    this.ref.markForCheck();
  }

  private removeChartDefintion(chartDefinition: ChartDefinition): void {
    const index =
        this.chartDefinitions.findIndex(def => def === chartDefinition);
    if (index >= 0) {
      this.chartDefinitions.splice(index, 1);
    }
    this.ref.markForCheck();
  }

  periodChanged(event: MatDatepickerInputEvent<Date>) {
    this.chartDefinitions =  this.chartDefinitions.map(def => Object.assign({}, def));
    this.ref.markForCheck();
  }

  getEndDateMax(): Date {
    return addDays(this.startDate.value, 15);
  }

  getStartDateMin(): Date {
    return subDays(this.endDate.value, 15);
  }
}
