import { TripsComponent } from './components/trips.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsRoutingModule } from './trips.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    TripsRoutingModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule
  ],
  providers: [],
  declarations: [TripsComponent],
  exports: [TripsComponent],
  bootstrap: [TripsComponent]
})
export class TripsModule { }
