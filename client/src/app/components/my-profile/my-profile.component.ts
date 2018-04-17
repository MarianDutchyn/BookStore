import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app.const';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {UserShipping} from '../../models/user-shipping';
import {ShippingService} from '../../services/shipping.service';

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

  private selectedShippingTab = 0;
  private defaultShippingSet: boolean;
  private defaultShippingId: number;
  private updateUserShipping: boolean;
  private userShipping: UserShipping = new UserShipping();
  private userShippingList: UserShipping[];


  constructor(private userService: UserService, private loginService: LoginService, private router: Router, private shippingService: ShippingService) { }

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

    selectedShippingChange(val: number) {
    this.selectedShippingTab = val;
    }


  onNewShipping() {
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUser();
        this.getShippingList();
        this.selectedShippingTab = 0;
      },
      error => {
        console.log(error);
      }
    );
  }

  getShippingList() {
    this.shippingService.getShippingList().subscribe(
      res => {
        this.userShippingList = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  onUpdateShipping(shipping: UserShipping) {
    this.userShipping = shipping;
    this.selectedShippingTab = 1;
  }

  onRemoveShipping(id: number) {
    this.shippingService.remove(id).subscribe(
      res => {
        this.getCurrentUser();
        this.getShippingList();
      },
      error => {
        console.log(error);
      }
    );
  }

  setDefaultShipping() {
    this.defaultShippingSet = false;
    this.shippingService.setDefaultShipping(this.defaultShippingId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultShippingSet = true;
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
        this.getShippingList();
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
