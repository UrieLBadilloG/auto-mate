import { ChoicesComponent } from './components/choices.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoicesRoutingModule } from './choices.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    ChoicesRoutingModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule
  ],
  providers: [],
  declarations: [ChoicesComponent],
  exports: [ChoicesComponent],
  bootstrap: [ChoicesComponent]
})
export class ChoicesModule { }
