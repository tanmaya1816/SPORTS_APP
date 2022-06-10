import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuardService } from './auth-guard.service';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'dashboard',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGuardService]
  },
  {
    path : 'products',
    component : ProductsComponent,
    canActivate : [AuthGuardService]
  },
  {
    path : 'customers',
    component : CustomersComponent,
    canActivate : [AuthGuardService]
  },
  {
    path : 'orders',
    component : OrdersComponent,
    canActivate : [AuthGuardService]
  },
  {
    path : 'about',
    component : AboutComponent
  },
  {
    path : '**',
    component : PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
