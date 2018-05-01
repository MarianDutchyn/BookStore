import { Component, OnInit } from '@angular/core';
import {AppConst} from "../../constants/app.const";
import {CheckoutService} from "../../services/checkout.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../models/order";
import {CartItem} from "../../models/cart-item";
import {Book} from "../../models/book";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private order: Order = new Order();
  private cartItemList: CartItem [];
  private selectedBook: Book;

  constructor(private checkoutService: CheckoutService, private route: ActivatedRoute, private router: Router) { }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['viewBook', this.selectedBook.id]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.order = JSON.parse(params['order']);
        this.cartItemList = this.order.cartItemList;
      }
    );
  }

}
