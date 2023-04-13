import { BlankComponent } from './components/blank.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankRoutingModule } from './blank.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    BlankRoutingModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule, 
    DialogModule
  ],
  providers: [],
  declarations: [BlankComponent],
  exports: [BlankComponent],
  bootstrap: [BlankComponent]
})
export class BlankModule { }
