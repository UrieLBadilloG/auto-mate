import { GenerateRouteComponent } from './components/test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateRouteRoutingModule } from './test.routing';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  imports: [
    CommonModule,
    GenerateRouteRoutingModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CalendarModule,
    InputTextModule
  ],
  providers: [],
  declarations: [GenerateRouteComponent],
  exports: [GenerateRouteComponent],
})
export class GenerateRouteModule { }
