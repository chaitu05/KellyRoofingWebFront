// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  OrderPickedUp : "Picked up",
  OrderDelivered : "Delivered",
  OrderConfirmedb44day : "Confirmed 4 days prior",
  OrderConfirmedb41day : "Confirmed 1 day prior",
  OrderOrdered : "Ordered",
  OrderNotOrdered : "Not-Ordered",
  backendServerName: "localhost",
  backendServerPort: "8080",
  addOrderUrl : "order/addOrder",
  authHeaderName : "Kr-Authorization",
};
