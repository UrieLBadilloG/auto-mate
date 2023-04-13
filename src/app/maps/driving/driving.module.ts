import { DrivingComponent } from './components/driving.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrivingRoutingModule } from './driving.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    DrivingRoutingModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule
  ],
  providers: [],
  declarations: [DrivingComponent],
  exports: [DrivingComponent],
  bootstrap: [DrivingComponent]
})
export class DrivingModule { }
