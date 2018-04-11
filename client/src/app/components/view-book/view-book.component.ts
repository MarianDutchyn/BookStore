import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import {AppConst} from '../../constants/app.const';
import {Book} from '../../models/book';
import {ActivatedRoute, Params} from '@angular/router';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  private serevrPath = AppConst.serverPath;
  private bookId: number;
  private book: Book = new Book();
  private quantity;
  private notEnoughStock: boolean;
  private addBookSuccess: boolean;
  private numberList: number [] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private bookService: BookService, private route: ActivatedRoute, private cartService: CartService) { }

  onAddToCart() {
    this.cartService.addItem(this.bookId, this.quantity).subscribe(
      res => {
        console.log(res);
        this.addBookSuccess = true;
      },
      error => {
        console.log(error);
        this.addBookSuccess = false;
        this.notEnoughStock = true;
      }
    );
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    });

    this.bookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res;
      },
      error => {
        console.log(error);
      }
    );
  }

}
