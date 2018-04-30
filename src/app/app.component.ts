import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {NewOrderComponent} from "./orders/new-order.component";
import {Order} from "./orders/order";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';

  /**
   * Constructor with needed dependencies
   * @param {MatDialog} matDialog MatDialog service is used to open NewOrderComponent as a Dialog
   */
  constructor(private matDialog: MatDialog) {
  }

  /**
   * Opens the New Order dialog for creation of a new order
   */
  openNewOrderDialog(): void {

    let mdc: MatDialogConfig = new MatDialogConfig();
    // mdc.height = window.innerHeight + 'px';
    mdc.width = '550px';
    mdc.closeOnNavigation = true;
    mdc.disableClose = true;
    let o: Order = new Order();
    o.city = "Dhone";
    mdc.data = o;

    let newOrderDialogRef = this.matDialog.open(NewOrderComponent, mdc);

  }
}
