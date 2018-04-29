/*import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns = ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
  }

  /!**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   *!/
  ngAfterViewInit() {

    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

/!** Builds and returns a new User. *!/
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}


/!** Constants used to fill up our data base. *!/
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/!** An example database that the data source uses to retrieve data for the table. *!/
export class ExampleHttpDao {
  constructor(private http: HttpClient) {
  }

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}*/


import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Order} from "./order";
import {OrdersService} from "./orders.service";
import {OrderType} from "./order-type";
import {environment} from "../../environments/environment";
import {NewOrderComponent} from "./new-order.component";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns = ['purchaseOrderNum', 'salesOrderNum', 'jobName', 'materialType', 'orderType', 'orderDate',
    'pickDeliverDt', 'city', 'orderStatus', 'note'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  // TODO: delete matDialog service injection from the construction.
  constructor(private olService: OrdersService, private matDialog: MatDialog) {
    this.olService.getOrders(null, new Date(), new Date()).then(ords => {
      console.log('# orders in return: ' + ords.length);
      this.dataSource = new MatTableDataSource(ords);
    });
  }

  // TODO: Delete this method out of this component.
  openNewOrderDialog(): void {

    let mdc: MatDialogConfig = new MatDialogConfig();
    mdc.height = '700px';
    mdc.width = '650px';
    mdc.closeOnNavigation = true;
    mdc.disableClose = true;
    let o: Order = new Order();
    o.city = "Dhone";
    mdc.data = o;

    let newOrderDialogRef = this.matDialog.open(NewOrderComponent, mdc);

  }

  getOrderStatus(order: Order): string {

    if (order.isPickedOrShipped) {
      return order.orderType === OrderType.Pickup ? environment.OrderPickedUp : environment.OrderDelivered;
    }
    else if (!order.orderPlaced)
      return environment.OrderNotOrdered;
    else if (order.orderConfirmations.length == 0 && order.orderPlaced)
      return environment.OrderOrdered;

    return "Confirmed " + order.orderConfirmations[0].priorDays +
      (order.orderConfirmations[0].priorDays > 1 ? " days" : " day") + " prior";

  };

  ngOnInit() {
    // TODO: remove the following line which creates order dialog.
    this.openNewOrderDialog();
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
