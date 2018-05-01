import { Component, OnInit } from '@angular/core';
import {AppConst} from "../../constants/app.const";
import {Book} from "../../models/book";
import {CartItem} from "../../models/cart-item";
import {ShippingAddrees} from "../../models/shipping-addrees";
import {ShoppingCart} from "../../models/shopping-cart";
import {BillingAddress} from "../../models/billing-address";
import {UserPayment} from "../../models/user-payment";
import {UserShipping} from "../../models/user-shipping";
import {Payment} from "../../models/payment";
import {Order} from "../../models/order";
import {NavigationExtras, Router} from "@angular/router";
import {CheckoutService} from "../../services/checkout.service";
import {CartService} from "../../services/cart.service";
import {ShippingService} from "../../services/shipping.service";
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private serverpath = AppConst.serverPath;
  private selectedBook: Book;
  private cartItemList: CartItem[];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private selectedTab: number;
  private shippingAddress: ShippingAddrees = new ShippingAddrees();
  private billingAddress: BillingAddress = new BillingAddress();
  private userPayment: UserPayment = new UserPayment();
  private userPaymentList: UserPayment [];
  private userShippingList: UserShipping [];
  private payment: Payment = new Payment();
  private emptyShippingList: boolean;
  private emptyPaymentList: boolean;
  private order: Order = new Order();

  constructor(private router: Router, private cartService: CartService, private shippingService: ShippingService, private paymentService: PaymentService, private checkoutService: CheckoutService) { }

  selectedChange(val: number) {
    this.selectedTab = val;
  }

  goToPayment() {
    this.selectedTab = 1;
  }

  goToReview() {
    this.selectedTab = 2;
  }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/viewBook', this.selectedBook.id]);
  }

  getCartItemList() {
    this.cartService.getCartItemList().subscribe(
      res => {
        this.cartItemList = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  setShippingAddress(userShipping: UserShipping) {
    this.shippingAddress.receiverName = userShipping.receiverName;
    this.shippingAddress.street = userShipping.street;
    this.shippingAddress.city = userShipping.city;
  }

  setPaymentMethod(userPayment: UserPayment) {
    this.payment.type = userPayment.type;
    this.payment.cardNumber = userPayment.cardNumber;
    this.payment.expiryMonth = userPayment.expiryMonth;
    this.payment.expiryYear = userPayment.expiryYear;
    this.payment.cvc = userPayment.cvc;
    this.payment.holderName = userPayment.holderName;
    this.payment.defaultPayment = userPayment.defaultPayment;
    this.billingAddress.billingAddressName = userPayment.userBilling.userBillingName;
    this.billingAddress.billingAddressStreet = userPayment.userBilling.userBillingStreet;
    this.billingAddress.billingAddressCity = userPayment.userBilling.userBillingCity;
  }

  setBillingAsShipping(checked: boolean){
    if(checked) {
      this.billingAddress.billingAddressName = this.shippingAddress.receiverName;
      this.billingAddress.billingAddressStreet = this.shippingAddress.street;
      this.billingAddress.billingAddressCity = this.shippingAddress.city;
    } else {
      this.billingAddress.billingAddressName = "";
      this.billingAddress.billingAddressStreet = "";
      this.billingAddress.billingAddressCity = "";
    }
  }

  onSubmit() {
    this.checkoutService.checkout(this.shippingAddress, this.billingAddress, this.payment).subscribe(
      res => {
        this.order = res;

        let navigationExtras: NavigationExtras = {
          queryParams: {
            "order": JSON.stringify(this.order)
          }
        };

        this.router.navigate(['/orderSummary'], navigationExtras);
      },
      error => {
        console.log(error);
      }
    );
  }


  ngOnInit() {
    this.getCartItemList();

    this.cartService.getShoppingCart().subscribe(
      res => {
        this.shoppingCart = res;
      },
      error => {
        console.log(error);
      }
    );

    this.shippingService.getShippingList().subscribe(
      res => {
        this.userShippingList = res;
        if (this.userShippingList.length){
          this.emptyShippingList = false;

          for (let userShipping of this.userShippingList){
            if (userShipping.defaultShipping){
              this.setShippingAddress(userShipping);
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );

    this.paymentService.getUserPaymentList().subscribe(
      res => {
        this.userPaymentList = res;
        if (this.userPaymentList.length){
          this.emptyPaymentList = false;

          for (let userPayment of this.userPaymentList){
            if (userPayment.defaultPayment){
              this.setPaymentMethod(userPayment);
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
