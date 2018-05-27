
import {OrderConfirmation} from "./order-confirmation";
import {MaterialType} from "./material-type";
import {OrderType} from "./order-type";

export class Order {

  purchOrderNum: number;
  salesOrderNum: number;
  userId: string;
  jobName: string;
  materialType: MaterialType; // (insulation, membrane, metal, Skylites)
  orderType: OrderType; // (Delivery or Pickup)
  orderDate: Date;
  pickupOrDeliverDate: Date;
  city: string;
  orderPlaced: boolean;
  orderConfirmations: OrderConfirmation[] = [];
  isPickedOrShipped: boolean;
  note?: string;

  // orderStatus: string; // ordered, confirmed 4 days prior, confirmed 1 day prior, shipped
  // shippedDate: Date;
  // orderStatus:string;

  /*public orderStatus():string {

      if (this.isPickedOrShipped)
          return "Shipped";
      else if (!this.orderPlaced)
          return "Not-Ordered";
      else if (this.orderConfirmations.length == 0 && this.orderPlaced)
          return "Ordered";

      return "Confirmed " + this.orderConfirmations[0].priorDays +
          (this.orderConfirmations[0].priorDays > 1 ? "day " : "days " + "prior");

  };*/

  public toString = () => {
    return `Order = (${
    "\nPurchase order number = " + this.purchOrderNum
    + "\nUserID = " + this.userId
    + "\nJob name = " + this.jobName
    + "\nMaterial type = " + this.materialType
    + "\nOrder type = " + this.orderType
    + "\nSales Order Number = " + this.salesOrderNum
    + "\nOrder date = " + this.orderDate
    + "\nPickup or Deliver date = " + this.pickupOrDeliverDate
    + "\nCity = " + this.city
    + "\nOrder Placed = " + this.orderPlaced
    + "\nOrder Confirmations = " + this.orderConfirmations
    + "\nOrder Completed = " + this.isPickedOrShipped
    + "\nNote = " + this.note
      })`
  }

}
