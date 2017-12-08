import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {
  MatFormFieldModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule,
  MatTableModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import { OrdersService } from './orders.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OrdersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  declarations: [OrdersComponent],
  providers: [OrdersService]
})
export class OrdersModule {
}
