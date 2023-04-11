import { TestComponent } from './components/test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test.routing';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { ListboxModule } from 'primeng/listbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    imports: [
        CommonModule,
        TestRoutingModule,
        ButtonModule,
        RippleModule,
        FormsModule,
        ReactiveFormsModule,
        GoogleMapsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        CalendarModule,
        InputTextModule,
        DialogModule,
        InputMaskModule,
        ListboxModule,
        InputSwitchModule,
        InputNumberModule
    ],
    providers: [],
    declarations: [TestComponent],
    exports: [TestComponent],
})
export class TestModule { }
