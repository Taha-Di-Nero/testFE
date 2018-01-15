import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartComponent } from './chart.component';
import { ChartsService } from '../services/charts.service';
import { ChartDefinition } from '../shared/data';
import { defaultSensors } from '../shared/utils';
import { MaterialModule } from '../shared/material.module';

let chartService: ChartsService;
const chartDef = new ChartDefinition();
chartDef.sensors = defaultSensors;

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        NgxChartsModule
      ],
      providers: [ChartsService, { provide: APP_BASE_HREF, useValue: '/' } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    chartService = fixture.debugElement.injector.get(ChartsService);
    component = fixture.componentInstance;
    component.chartDefinition = chartDef;
    component.startDate = new FormControl(new Date());
    component.endDate = new FormControl(new Date());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
