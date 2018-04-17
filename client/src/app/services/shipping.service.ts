import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app.const';
import {UserShipping} from '../models/user-shipping';

@Injectable()
export class ShippingService {
    private serverPath = AppConst.serverPath;

  constructor(private http: HttpClient) { }

  newShipping(shipping: UserShipping) {
    let url = this.serverPath+"/shipping/add";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(shipping), {headers: headers});
  }

  getShippingList() {
    let url = this.serverPath+"/shipping/getUserShippingList";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get<UserShipping[]>(url,{headers: headers});
  }

  remove(id: number) {
    let url = this.serverPath+"/shipping/remove";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: headers});
  }

  setDefaultShipping(id: number) {
    let url = this.serverPath+"/shipping/setDefault";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: headers});
  }

}
