import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../models/book';
import {AppConst} from '../constants/app.const';


@Injectable()
export class BookService {

  constructor(private http: HttpClient) {}
    private serverPath = AppConst.serverPath;

    getBookList() {
      let url = this.serverPath+"/book/bookList";

      let headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'x-auth-token' : localStorage.getItem('xAuthToken')
      });

      return this.http.get<Book []>(url, {headers, responseType: 'json'});
    }

    getBook(bookId: number) {
      let url = this.serverPath+"/book/"+bookId;

      let headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'x-auth-token' : localStorage.getItem('xAuthToken')
      });

      return this.http.get<Book>(url, {headers, responseType: 'json'});
    }

  search(keyword: string) {
    let url = this.serverPath+"/book/search";

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post<Book []>(url, keyword, {headers, responseType: 'json'});
  }

}
