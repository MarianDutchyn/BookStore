import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ShippingAddrees} from "../models/shipping-addrees";
import {BillingAddress} from "../models/billing-address";
import {Payment} from "../models/payment";
import {Order} from "../models/order";
import {AppConst} from "../constants/app.const";

@Injectable()
export class CheckoutService {

  private serverPath = AppConst.serverPath;

  constructor(private http: HttpClient) {}

  checkout(shippingAddress: ShippingAddrees, billingAddress: BillingAddress, payment: Payment) {
    let url = this.serverPath+"/checkout/checkout";

    let orderInfo = {
      "shippingAddress": shippingAddress,
      "billingAddress": billingAddress,
      "payment": payment,
    };
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post<Order>(url, orderInfo, {headers, responseType: 'json'});
  }

  getUserOrder() {
    let url = this.serverPath+"/checkout/getUserOrder";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get<Order>(url, {headers, responseType: 'json'});
  }
}
