import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConst} from "../constants/app.const";
import {Order} from "../models/order";
import {CartItem} from "../models/cart-item";

@Injectable()
export class OrderService {
  public serverPath = AppConst.serverPath;

  constructor(private http: HttpClient) { }
  getOrderList() {
    let url = this.serverPath+"/order/getOrderList";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get<Order[]>(url, {headers, responseType: 'json'});
  }

  getCartItemList(id: number) {
    let url = this.serverPath+"/order/getCartItemList";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post<CartItem []>(url, id, {headers, responseType: 'json'});
  }
}
