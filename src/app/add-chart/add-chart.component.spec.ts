import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AddChartComponent } from './add-chart.component';
import { MaterialModule } from '../shared/material.module';
import { ColorPickerModule } from 'ngx-color-picker';

describe('AddChartComponent', () => {
  let component: AddChartComponent;
  let fixture: ComponentFixture<AddChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChartComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        ColorPickerModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
