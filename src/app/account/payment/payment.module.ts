import { PaymentComponent } from './components/payment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule
  ],
  providers: [],
  declarations: [PaymentComponent],
  exports: [PaymentComponent],
})
export class PaymentModule { }
