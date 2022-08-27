import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private cart: CartService) { }

  @Input() menu: Menu;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.cart.totalPrices(this.menu.price, this.menu);
  }

  deleteMenu(): void {
    this.cart.deleteProduct(this.menu);
  }

  quantity(e: any): void {
    let quant: number = e.target.value;
    if (quant < 1) {
      quant = 1;
    }

    this.totalPrice = this.menu.price * quant;
    this.cart.totalPrices(this.totalPrice, this.menu);
  }

}
