import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
