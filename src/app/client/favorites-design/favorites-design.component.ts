import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-favorites-design',
  templateUrl: './favorites-design.component.html',
  styleUrls: ['./favorites-design.component.css']
})
export class FavoritesDesignComponent implements OnInit {

  constructor(private auth: AuthService, private clients: ClientsService, private favorites: FavoritesService,
              private menus: MenusService, private router: Router) { }

  favoritesList: any[] = [];
  showSpinner: boolean = true;
  clientID: number = 0;

  ngOnInit(): void {
    this.auth._userStatus$.subscribe(res => {
      this.clients.getClientByUsername(res.username).subscribe((val: any) => {
        this.clientID = val[0].client_id;
        this.favorites.getFavoritesByClient(val[0].client_id).subscribe((r: any) => {
          r.forEach((element: any) => {
            this.menus.getMenuById(element.menu_id).subscribe(menu => this.favoritesList.push(menu[0]));
            this.showSpinner = false;
          });
        });
      });
    });
  }

  selectedProduct(menu_id: number): void {
    this.router.navigate(['/product', menu_id]);
  }

  deleteProduct(menu_id: number, client_id: number): void {
    const index = this.favoritesList.map(e => e.menu_id).indexOf(menu_id);
    this.favoritesList.splice(index, 1);
    this.favorites.deleteProduct(client_id, menu_id).subscribe(res => console.log(res));
  }

  stop(e: any) {
    e.stopPropagation();
  }

}
