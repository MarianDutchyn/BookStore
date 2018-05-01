import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import { DataTablesModule} from 'angular-datatables';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserShippingComponent } from './components/user-shipping/user-shipping.component';
import { OrderComponent } from './components/order/order.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {BookService} from './services/book.service';
import {CartService} from './services/cart.service';
import {ShippingService} from './services/shipping.service';
import {PaymentService} from './services/payment.service';
import {CheckoutService} from './services/checkout.service';
import {OrderService} from "./services/order.service";




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent,
    MyProfileComponent,
    BookListComponent,
    ViewBookComponent,
    ShoppingCartComponent,
    UserShippingComponent,
    OrderComponent,
    OrderSummaryComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
  ],
  providers: [
    LoginService,
    UserService,
    BookService,
    CartService,
    ShippingService,
    PaymentService,
    CheckoutService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
