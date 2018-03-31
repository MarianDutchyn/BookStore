import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app.const';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private loggedIn: boolean;
  private dataFetched = false;
  private user: User = new User();
  private credential = {'username':'', 'password': ''};
  private currentPassword: string;
  private newPassword: string;
  private incorrectPassword: boolean;
  private updateSuccess: boolean;

  constructor(private userService: UserService, private loginService: LoginService, private router: Router) { }

    onUpdateUserInfo() {
    this.userService.onUpdateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
      res => {
        console.log(res);
        this.updateSuccess = true;
      },
      error => {
        console.log(error);
        const errorMsg = error.error;
        if (errorMsg === 'Incorrect current password') {
          this.incorrectPassword = true;
        }
      }
    );
    }

    getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = res;
        this.dataFetched = true;
      },
      error => {
        console.log(error);
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
        this.router.navigate(['/myAccount']);
      }
    );

    this.getCurrentUser();
  }

}
