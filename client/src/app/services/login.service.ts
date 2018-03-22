import { Injectable } from '@angular/core';
import {AppConst} from '../constants/app.const';
import {Headers, Http} from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  sentCredential( username: string, password: string) {
    let url = AppConst.serverPath+"/token";
    let encodedCredentials = btoa(username+":"+ password);
    let basicHeader = "Basic "+ encodedCredentials;
    let headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : basicHeader
    });
    return this.http.get(url, {headers: headers});
  }

  checkSessoin() {
    let url = AppConst.serverPath+"/checkSession";
    let headers = new Headers({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: headers});
  }

  logout() {
    let url = AppConst.serverPath+"/user/logout";
    let headers = new Headers({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, '', {headers});
  }

}
