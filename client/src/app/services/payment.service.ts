import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app.const';
import {UserPayment} from '../models/user-payment';

@Injectable()
export class PaymentService {
  private serverPath = AppConst.serverPath;

  constructor(private http: HttpClient) { }

  newUserPayment(payment: UserPayment) {
    let url = this.serverPath+"/payment/add";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(payment), {headers: headers});
  }

  getUserPaymentList() {
    let url = this.serverPath+"/payment/getUserPaymentList";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get<UserPayment[]>(url,{headers: headers});
  }

  remove(id: number) {
    let url = this.serverPath+"/payment/remove";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: headers});
  }

  setDefaultUserPayment(id: number) {
    let url = this.serverPath+"/payment/setDefault";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: headers});
  }

}
