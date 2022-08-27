import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  userData: any = {};
  cartLength: number = 0;

  constructor(private auth: AuthService, private cart: CartService) { 
    this.auth._userStatus$.subscribe(res => {
      this.userData = res;
    });
  }

  ngOnInit(): void {
    this.cart.getProducts().subscribe(res => this.cartLength = res.length);
  }

  logOut(): void {
    this.auth.logout();
  }

}
