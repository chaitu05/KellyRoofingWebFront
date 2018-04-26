import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '../shared/material.module';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {HttpClientModule} from "@angular/common/http";
import {OrdersService} from './orders.service';
import {FormsModule} from "@angular/forms";
import {NewOrderComponent} from './new-order.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    OrdersRoutingModule,
  ],
  declarations: [OrdersComponent, NewOrderComponent],
  providers: [OrdersService],
})
export class OrdersModule {
}
