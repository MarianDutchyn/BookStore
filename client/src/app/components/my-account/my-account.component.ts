import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app.const';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private loginError: boolean = false;
  private loggedIn = false;
  private credential = {'username':'', 'password':''};

  private emailSent: boolean = false;
  private usernameExists: boolean;
  private emailExists: boolean;
  private username: string;
  private email: string;

  private emailNotExists: boolean = false;
  private forgetPasswordEmailSent: boolean;
  private recoverEmail: string;

  constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

  onLogin() {
    this.loginService.sentCredential(this.credential.username, this.credential.password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('xAuthToken', res.json().token);
        this.loggedIn = true;
        location.reload();
        this.router.navigate(['home']);


      },
      error => {
        this.loggedIn = false;
        this.loginError = true;
        console.log(error);
    }
    );

  }

  onNewAccount() {
    this.emailSent = false;
    this.usernameExists = false;
    this.emailExists = false;

    this.userService.newUser(this.username, this.email).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        this.emailSent = false;
        console.log(error);
        const errorMsg = error.error;
        if (errorMsg === 'usernameExists') {
          this.usernameExists = true;
        }
        if (errorMsg === 'emailExists') {
          this.emailExists = true;
        }
      }
    );
  }

  onForgetPassword() {
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;
    this.userService.retrievePassword(this.recoverEmail).subscribe(
      res => {
        console.log(res);
        this.forgetPasswordEmailSent = true;
      },
      error => {
        console.log(error);
        const errorMsg = error.error;
        if (error.error === 'Email not found'){
          this.forgetPasswordEmailSent = false;
          this.emailNotExists = true;
        }
      }

    );
  }

  ngOnInit() {
  this.loginService.checkSessoin().subscribe(
    res => {
        this.loggedIn = true;
    },
    error => {
      console.log(error);
        this.loggedIn = false;
    }
  );
  }


}
