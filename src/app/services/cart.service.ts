import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastr: ToastrService, private route: Router) { }

  public cartList$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  public totalPrice$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  productList: Menu[] = [];
  totalPricesList: any[] = [];

  getProducts(): Observable<Menu[]> {
    return this.cartList$.asObservable();
  }

  addProduct(product: Menu): void {
    if (!this.productList.some(i => i.menu_id === product.menu_id)) {
      this.productList.push(product);
      this.cartList$.next(this.productList);
    }
    else {
      this.toastr.error('Este menú ya está en el carrito');
    }
  }

  deleteProduct(product: Menu): void {
    let position = this.productList.indexOf(product);
    let index = this.totalPricesList.map(e => e.menu_id).indexOf(product.menu_id);

    this.productList.splice(position, 1);
    this.cartList$.next(this.productList);
    this.totalPricesList.splice(index, 1);
    this.totalPrice$.next(this.totalPricesList);
    console.log(this.totalPricesList);
  }

  totalPrices(total: number, menu: Menu): void {
    let model = {
      "total": total,
      "menu_id": menu.menu_id,
      "unitary": menu.price
    }

    let index = this.totalPricesList.map(e => e.menu_id).indexOf(menu.menu_id);

    if (index === -1) {
      this.totalPricesList.push(model);
      this.totalPrice$.next(this.totalPricesList);
    }
    else if (index > -1) {
      this.totalPricesList[index] = model;
      this.totalPrice$.next(this.totalPricesList);
    }
  }

  toBilling(totalArr: any[]): void {
    if (totalArr.length === 0) {
      this.toastr.error('No tienes nada en el carro', '', {
        "positionClass": 'toast-bottom-right'
      });
    }
    else {
      this.route.navigate(['/billing']);
    }
  }

  cleanCart(): void {
    this.productList = [];
    this.cartList$.next(this.productList);
    this.totalPricesList = [];
    this.totalPrice$.next(this.totalPricesList);
  }

}
