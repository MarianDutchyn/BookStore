import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import {AppConst} from '../../constants/app.const';
import {Book} from '../../models/Book';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  private serevrPath = AppConst.serverPath;
  private bookId: number;
  private book: Book = new Book();
  private notEnoughStock: boolean;
  private quantity;
  private numberList: number [] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

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
