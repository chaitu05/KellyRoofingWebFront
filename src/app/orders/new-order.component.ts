import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {OrdersService} from "./orders.service";
import {Order} from "./order";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  private order: Order = new Order();
  orderForm: FormGroup;

  constructor(private matDialogRef: MatDialogRef<NewOrderComponent>, private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) order: Order,
              ordersService: OrdersService) {

    this.order = order;
    console.log(order.toString());

  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      purchOrderNum: ['', [Validators.required, Validators.pattern('[0-9]{3}[0-9]*')]],
      pickupDate: ['', [Validators.required]],

    });
  }

  save(): void {

    console.log('in save: ' + JSON.stringify(this.orderForm.value));

    // TODO: Validate Order data
    // TODO: Save data to repo

    // Close the dialog.
    // TODO: send the created order.
    this.matDialogRef.close(new Order());
    // TODO: Show Snackbar Message

  }

  close(): void {
    this.matDialogRef.close();
  }

}
