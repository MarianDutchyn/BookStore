import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import 'hammerjs';


import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import {BookListComponent, DialogResultExampleDialog} from './components/book-list/book-list.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { ViewBookComponent } from './components/view-book/view-book.component';

import { LoginService} from './services/login.service';
import {AddBookService} from './services/add-book.service';
import { UploadImageService } from './services/upload-image.service';
import {BookListService} from './services/book-list.service';
import { GetBookService} from './services/get-book.service';
import {EditBookService} from './services/edit-book.service';
import { RemoveBookService} from './services/remove-book.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    AddNewBookComponent,
    BookListComponent,
    ViewBookComponent,
    EditBookComponent,
    DialogResultExampleDialog
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    AddBookService,
    UploadImageService,
    BookListService,
    GetBookService,
    EditBookService,
    RemoveBookService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogResultExampleDialog]
})
export class AppModule { }
