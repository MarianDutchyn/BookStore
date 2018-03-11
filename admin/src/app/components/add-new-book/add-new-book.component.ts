import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/book';
import { AddBookService} from '../../services/add-book.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  private newBook: Book = new Book();
  private bookAdded: boolean;

  constructor(private addBookService: AddBookService) {}

    onSubmit() {
      this.addBookService.sendBook(this.newBook).subscribe(
        res => {
          this.bookAdded = true;
          this.newBook = new Book();
          this.newBook.active = true;
          this.newBook.category = "Management";
          this.newBook.language = "Ukrainian";
        },
        error => {
          console.log(error);
        }
      );
    }

  ngOnInit() {
    this.bookAdded = false;
    this.newBook.active = true;
    this.newBook.category = "Management";
    this.newBook.language = "Ukrainian";
  }

}
