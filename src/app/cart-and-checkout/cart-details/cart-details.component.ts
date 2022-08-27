import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  constructor(private cart: CartService) { }

  total: any[] = [];
  totalPrice: number = 0;
  iva: number = 0;
  subtotal: number = 0;

  ngOnInit(): void {
    this.cart.totalPrice$.subscribe(async (res: any) => {
      this.total = await res;

      let suma = 0;
      let iva = 0;
      let subtotal = 0;
      
      this.total.forEach(el => {
        suma += el.total;
        iva = (suma * 0.22);
        subtotal = suma - iva;
        this.iva = iva;
        this.subtotal = subtotal;
        this.totalPrice = suma;
      });

      if (this.total.length === 0) {
        this.iva = 0;
        this.subtotal = 0;
        this.totalPrice = 0;
      }
    });
  }

  buy(total: any[]): void {
    this.cart.toBilling(total);
  }

}
