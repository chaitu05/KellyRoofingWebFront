import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: "/orders", pathMatch: "full"},
  {path: "login", loadChildren: "./login/login.module#LoginModule"},
  {path: "profile", loadChildren: "./profile/profile.module#ProfileModule"},
  {path: "orders", loadChildren: "./orders/orders.module#OrdersModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
