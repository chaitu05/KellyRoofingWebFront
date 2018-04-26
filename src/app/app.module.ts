import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NewOrderComponent} from "./orders/new-order.component";
import {OrdersModule} from "./orders/orders.module";
import {MaterialModule} from "./shared/material.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    OrdersModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewOrderComponent],
})
export class AppModule {
}
