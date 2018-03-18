import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Book } from '../../models/book';
import { GetBookService } from '../../services/get-book.service';
import { EditBookService } from '../../services/edit-book.service';
import { UploadImageService } from '../../services/upload-image.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  private bookId: number;
  private book: Book = new Book();
  private bookUpdated: boolean;

  constructor(private editBookService: EditBookService, private getBookService: GetBookService, private uploadImageService: UploadImageService,
              private route: ActivatedRoute, private router: Router) {}


    onSubmit() {
      this.editBookService.sendBook(this.book).subscribe(
        data => {
          this.uploadImageService.modify(JSON.parse(JSON.stringify(data)).id);
          this.bookUpdated = true;
        },
        error => {
          console.log(error);
        }
      );
    }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    });

    this.getBookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res;
      },
      error => {
        console.log(error);
      }
    );
  }

}
