import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {OrdersService} from "./orders.service";
import {Order} from "./order";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../login/user.service";
import {User} from "../model/user";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  private order: Order = new Order();
  orderForm: FormGroup;
  users: Set<User>;

  constructor(private matDialogRef: MatDialogRef<NewOrderComponent>, private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) order: Order,
              private ordersService: OrdersService, private userService: UserService) {

    this.order = order;
    this.order.userId = '10645c4a-cc25-11e7-acdc-96395d26a8d8';
    console.log(order.toString());

  }

  ngOnInit() {

    this.users = this.userService.getUsers();

    this.orderForm = this.fb.group({
      purchOrderNum: [this.order.purchOrderNum, [Validators.required, Validators.pattern('[0-9]{3}[0-9]*')]],
      salesOrderNum: [this.order.salesOrderNum, [Validators.required, Validators.pattern('[0-9]{3}[0-9]*')]],
      pickupDate: [this.order.pickupDate, [Validators.required]],
      userId: [this.order.userId, [Validators.required]],

    });
  }

  save(): void {

    console.log('in save: ' + JSON.stringify(this.orderForm.value));

    // TODO: Validate Order data

    // Merge updated values and initial order to create changed order.
    let changedOrder:Order = Object.assign({}, this.order, this.orderForm.value);

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
