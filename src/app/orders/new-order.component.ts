import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {OrdersService} from "./orders.service";
import {Order} from "./order";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  private order: Order = new Order();

  constructor(private matDialogRef: MatDialogRef<NewOrderComponent>,
              @Inject(MAT_DIALOG_DATA) order: Order,
              ordersService: OrdersService) {
    this.order = order;
    console.log(order.toString());
  }

  ngOnInit() {
  }

  save(): void {
    // TODO: Validate Order data
    // TODO: Save data to repo

    // Close the dialog
    this.matDialogRef.close();
    // TODO: Show Snackbar Message

  }

  close(): void {
    this.matDialogRef.close();
  }

}
