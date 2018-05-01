import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CartItem} from '../models/cart-item';
import {AppConst} from '../constants/app.const';
import {ShoppingCart} from '../models/shopping-cart';


@Injectable()
export class CartService {
  private serverPath = AppConst.serverPath;

  constructor(private http: HttpClient) { }

  addItem(bookId: number, quantity: number) {
    let url = this.serverPath+"/cart/add";
    let cartItemInfo = {
      "id": bookId,
      "quantity": quantity
    };
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, cartItemInfo,{headers: headers});
  }

  getCartItemList() {
    let url = this.serverPath+"/cart/cartItemList";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get<CartItem []>(url, {headers, responseType: 'json'});
  }

  getShoppingCart() {
    let url = this.serverPath+"/cart/shoppingCart";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get<ShoppingCart>(url, {headers: headers});
  }

  updateCartItem(bookId: number, quantity: number) {
    let url = this.serverPath+"/cart/updateCartItem";

    let cartItemInfo = {
      "id": bookId,
      "quantity": quantity
    };

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, cartItemInfo, {headers: headers});
  }

  removeCartItem(id: number) {
    let url = this.serverPath+"/cart/removeCartItem";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers, responseType: 'json'});
  }
}
