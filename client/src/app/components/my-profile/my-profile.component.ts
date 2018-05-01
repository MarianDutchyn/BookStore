import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app.const';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {UserShipping} from '../../models/user-shipping';
import {ShippingService} from '../../services/shipping.service';
import {UserPayment} from '../../models/user-payment';
import {UserBilling} from '../../models/user-billing';
import {PaymentService} from "../../services/payment.service";
import {Order} from "../../models/order";
import {OrderService} from "../../services/order.service";
import {CartItem} from "../../models/cart-item";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private loggedIn: boolean;
  private dataFetched = false;
  private user: User = new User();
  private credential = {'username':'', 'password': ''};
  private currentPassword: string;
  private newPassword: string;
  private incorrectPassword: boolean;
  private updateSuccess: boolean;

  private selectedShippingTab = 0;
  private selectedBillingTab = 0;
  private defaultShippingSet: boolean;
  private defaultShippingId: number;
  private userShipping: UserShipping = new UserShipping();
  private userShippingList: UserShipping[];

  private userPayment: UserPayment = new UserPayment();
  private userBilling: UserBilling = new UserBilling();
  private userPaymentList: UserPayment[];
  private defaultPaymentSet:  boolean;
  private defaultUserPaymentId: number;

  private cartItemList: any [];
  private orderList: Order[] = [];
  private order: Order = new Order();
  private displayOrderDetail: boolean;


  constructor(private userService: UserService, private loginService: LoginService, private router: Router, private shippingService: ShippingService, private paymentService: PaymentService, private orderService: OrderService) { }

  onUpdateUserInfo() {
  this.userService.onUpdateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
    res => {
      console.log(res);
      this.updateSuccess = true;
    },
    error => {
      console.log(error);
      const errorMsg = error.error;
      if (errorMsg === 'Incorrect current password') {
        this.incorrectPassword = true;
      }
    }
  );
  }

  getCurrentUser() {
  this.userService.getCurrentUser().subscribe(
    res => {
      this.user = res;
      this.getUserShippingList();
      this.getUserPaymentList();

      for (let index in this.userShippingList) {
        if(this.userShippingList[index].defaultShipping === true) {
          this.defaultShippingId = this.userShippingList[index].id;
          break;
        }
      }

      for (let index in this.userPaymentList) {
        if(this.userPaymentList[index].defaultPayment) {
          this.defaultUserPaymentId = this.userPaymentList[index].id;
          break;
        }
      }
      this.dataFetched = true;
    },
    error => {
      console.log(error);
    }
  );
  }

  selectedShippingChange(val: number) {
  this.selectedShippingTab = val;
  }

  selectedBillingChange(val: number) {
    this.selectedBillingTab = val;
  }


  onNewShipping() {
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedShippingTab = 0;
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserShippingList() {
    this.shippingService.getShippingList().subscribe(
      res => {
        this.userShippingList = res;
      },
      error => {
        console.log(error);
      }
    );
  }


  onUpdateShipping(shipping: UserShipping) {
    this.userShipping = shipping;
    this.selectedShippingTab = 1;
  }

  onRemoveShipping(id: number) {
    this.shippingService.remove(id).subscribe(
      res => {
        this.getCurrentUser();
      },
      error => {
        console.log(error);
      }
    );
  }

  setDefaultShipping() {
    this.defaultShippingSet = false;
    this.shippingService.setDefaultShipping(this.defaultShippingId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultShippingSet = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  onNewPayment() {
    this.paymentService.newUserPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedBillingTab = 0;
        this.userPayment = new UserPayment();
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserPaymentList() {
    this.paymentService.getUserPaymentList().subscribe(
      res => {
        this.userPaymentList = res;
      },
      error => {
        console.log(error);
      }
    );
  }


  onUpdatePayment (payment: UserPayment) {
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;
  }

  onRemovePayment(id: number) {
    this.paymentService.remove(id).subscribe(
      res => {
        this.getCurrentUser();
      },
      error => {
        console.log(error);
      }
    );
  }

  setDefaultPayment() {
    this.defaultPaymentSet = false;
    this.paymentService.setDefaultUserPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultPaymentSet = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  onDisplayOrder(order: Order) {
    this.order = order;
    this.displayOrderDetail = true;
  }


  ngOnInit() {
    this.loginService.checkSessoin().subscribe(
      res => {
        this.loggedIn = true;
        this.getUserShippingList();
        this.getUserPaymentList();
      },
      error => {
        console.log(error);
        this.loggedIn = false;
        this.router.navigate(['/myAccount']);
      }
    );

    this.getCurrentUser();

    this.orderService.getOrderList().subscribe(
      res => {
        this.orderList = res;
      },
      error => {
        console.log(error);
      }
    );

    this.userPayment.type = '';
    this.userPayment.expiryMonth =  '';
    this.userPayment.expiryYear = '';
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet = false;
    this.defaultShippingSet = false;
  }

}
