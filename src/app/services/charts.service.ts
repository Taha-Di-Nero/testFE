import { ChartTypes } from './../shared/data';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {addDays} from 'date-fns';

import {ChartDefinition, Sensor} from '../shared/data';
import {randomIntFromInterval} from '../shared/utils';

import {BaseService} from './base.service';

@Injectable()
export class ChartsService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getSensorsData(chartDefinition: ChartDefinition, startDate: Date, endDate: Date) {
    return Promise.resolve(
        this.generateRandomData(chartDefinition, startDate, endDate));
  }

  private generateRandomData(chartDefinition: ChartDefinition, startDate: Date, endDate: Date): any {
    let data = new Array<any>();
    if (chartDefinition.type === ChartTypes.Line) {
      chartDefinition.sensors.forEach(sensor => data.push(this.generateRandomDataForLine(sensor, startDate, endDate)));
    } else if (chartDefinition.type === ChartTypes.Bar) {
      data = this.generateRandomDataForBar(chartDefinition.sensors, startDate, endDate);
    }
    return data;
  }

  private generateRandomDataForLine(sensor: Sensor, startDate: Date, endDate: Date): any {
    let init = new Date(startDate);
    const data = {name: sensor.name, series: new Array<any>()};
    while (init <= endDate) {
      data['series'].push({value: randomIntFromInterval(0, 100), name: init});
      init = addDays(init, 1);
    }
    return data;
  }
  private generateRandomDataForBar(sensors: Sensor[], startDate: Date, endDate: Date): any {
    const data = new Array<any>();
    let init = new Date(startDate);
    while (init <= endDate) {
      const serie = {name: init, series: new Array<any>()};
      sensors.forEach(sensor => serie['series'].push({value: randomIntFromInterval(0, 100), name: sensor.name}));
      data.push(serie);
      init = addDays(init, 1);
    }
    return data;
  }
}
