import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {ViewBookComponent} from './components/view-book/view-book.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {OrderComponent} from "./components/order/order.component";
import {OrderSummaryComponent} from "./components/order-summary/order-summary.component";


const appRoutes: Routes = [
  {
    path : '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'myAccount',
    component: MyAccountComponent
  },
  {
    path: 'myProfile',
    component: MyProfileComponent
  },
  {
    path: 'bookList',
    component: BookListComponent
  },
  {
    path: 'viewBook/:id',
    component: ViewBookComponent
  },
  {
    path: 'shoppingCart',
    component: ShoppingCartComponent
  },
  {
    path: 'checkout',
    component: OrderComponent
  },
  {
    path: 'orderSummary',
    component: OrderSummaryComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
