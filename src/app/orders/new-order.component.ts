import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {OrdersService} from "./orders.service";
import {Order} from "./order";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../login/user.service";
import {User} from "../model/user";
import {MaterialType} from "./material-type";
import {OrderType} from "./order-type";
import {OrderConfirmation} from "./order-confirmation";
import {Utilz} from "../utilz";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  private order: Order = new Order();
  orderForm: FormGroup;
  users: Set<User>;
  materialTypeValues: string[] = Object.values(MaterialType);
  orderTypeValues: string[] = Object.values((OrderType));
  usStates: string[] = Utilz.usStateVals;
  confirmation4DaysPrior: boolean = false;
  confirmation2DaysPrior: boolean = false;
  confirmation1DayPrior: boolean = false;

  constructor(private matDialogRef: MatDialogRef<NewOrderComponent>, private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) order: Order,
              private ordersService: OrdersService, private userService: UserService) {

    this.order = order;
    // this.order.userId = '10645c4a-cc25-11e7-acdc-96395d26a8d8';
    // this.order.materialType = MaterialType.insulation;
    this.initOrderConfirmations(order);
    console.log(order.toString()
      + '\nMaterial type keys: ' + Object.keys(MaterialType)
      + '\nMaterial type keys: ' + Object.keys(MaterialType)
      + '\nMaterial type values: ' + Object.values(MaterialType)
    );


  }

  ngOnInit() {

    this.userService.getAllUsers().then(users => {
      this.users = users;
    });

    this.orderForm = this.fb.group({
      purchOrderNum: [this.order.purchOrderNum, [Validators.required, Validators.pattern('[0-9]{3}[0-9]*')]],
      salesOrderNum: [this.order.salesOrderNum, [Validators.required, Validators.pattern('[0-9]{3}[0-9]*')]],
      pickupOrDeliverDate: [this.order.pickupOrDeliverDate, [Validators.required]],
      userId: [this.order.userId, [Validators.required]],
      jobName: [this.order.jobName, [Validators.required, Validators.minLength(3)]],
      materialType: [this.order.materialType, [Validators.required]],
      orderType: [this.order.orderType, [Validators.required]],
      city: [this.order.city, [Validators.required, Validators.minLength(3)]],
      productType: [this.order.productType, []],
      addressLine: [this.order.addressLine, []],
      addrState: [this.order.addrState, [Validators.required]],
      isPickedOrShipped: [this.order.isPickedOrShipped, []],
      note: [this.order.note, []],
      orderConfirmation4DaysPrior: [this.confirmation4DaysPrior, []],
      orderConfirmation2DaysPrior: [this.confirmation2DaysPrior, []],
      orderConfirmation1DayPrior: [this.confirmation1DayPrior, []],

    });

  }

  save(): void {

    console.log('in save: ' + JSON.stringify(this.orderForm.value));

    // TODO: Validate Order data. Might not be needed.
    this.validateOrderData();

    // Merge updated values and initial order to create changed order.
    let modifiedOrder: Order = Object.assign({}, this.order, this.orderForm.value);
    console.log('Changed order: ' + modifiedOrder);

    // Update order confirmations.
    this.updateOrderConfirmations(modifiedOrder);
    console.log(modifiedOrder.toString());

    // TODO: Save data to repo

    // Close the dialog.
    // TODO: send the created order.
    this.matDialogRef.close(new Order());
    // TODO: Show Snackbar Message

  }

  close(): void {
    this.matDialogRef.close();
  }

  private initOrderConfirmations(o: Order): void {

    console.log('order confirmations: ' + o.orderConfirmations + '\n!orderConfirmations: ' + !o.orderConfirmations
      + '\n!!orderConfirmations: ' + !!o.orderConfirmations);
    if (!o.orderConfirmations || o.orderConfirmations.length == 0)
      return;

    this.confirmation4DaysPrior = this.findOrderConfirmationPriorTo(4, o);
    this.confirmation2DaysPrior = this.findOrderConfirmationPriorTo(2, o);
    this.confirmation1DayPrior = this.findOrderConfirmationPriorTo(1, o);


  }

  private findOrderConfirmationPriorTo(days: number, o: Order): boolean {

    if (!o.orderConfirmations || o.orderConfirmations.length == 0)
      return false;

    let oc = o.orderConfirmations.find((oc) => oc.priorDays === days);

    if (oc)
      return oc.confirmed;
    else
      return false;

  }

  private updateOrderConfirmations(modifiedOrder: Order): void {

    this.updateOrderConfirmation(4, this.orderForm.value.orderConfirmation4DaysPrior, this.order, modifiedOrder);
    this.updateOrderConfirmation(2, this.orderForm.value.orderConfirmation2DaysPrior, this.order, modifiedOrder);
    this.updateOrderConfirmation(1, this.orderForm.value.orderConfirmation1DayPrior, this.order, modifiedOrder);

  }

  private updateOrderConfirmation(days: number, confirmationDaysPrior: boolean, o: Order, modifiedOrder: Order): void {

    let oc: OrderConfirmation;

    if (o.orderConfirmations && o.orderConfirmations.length > 0)
      oc = o.orderConfirmations.find((ocElement) => ocElement.priorDays === days);

    if (oc && oc.confirmed !== confirmationDaysPrior) {

      oc.confirmed = confirmationDaysPrior;
      oc.confirmedAt = new Date();
      oc.priorDays = days;
      modifiedOrder.orderConfirmations.push(oc);

    }
    else if (confirmationDaysPrior) {

      oc = new OrderConfirmation();
      oc.confirmed = confirmationDaysPrior;
      oc.confirmedAt = new Date();
      oc.priorDays = days;
      modifiedOrder.orderConfirmations.push(oc);

    }

  }


  private validateOrderData() {

  }
}
