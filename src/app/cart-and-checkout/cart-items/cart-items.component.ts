import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  constructor(private cart: CartService) { }

  productList: Menu[] = [];

  ngOnInit(): void {
    this.cart.getProducts().subscribe(res => this.productList = res);
  }

}
