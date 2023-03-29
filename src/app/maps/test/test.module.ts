import { TestComponent } from './components/test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test.routing';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [],
  declarations: [TestComponent],
  exports: [TestComponent],
})
export class TestModule { }
