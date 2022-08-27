import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client.model';
import { Menu } from 'src/app/models/menu.model';
import { Rating } from 'src/app/models/rating.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { MenusService } from 'src/app/services/menus.service';
import { RatingsService } from 'src/app/services/ratings.service';

@Component({
  selector: 'app-product-design',
  templateUrl: './product-design.component.html',
  styleUrls: ['./product-design.component.css']
})
export class ProductDesignComponent implements OnInit {

  constructor(private menus: MenusService, private route: ActivatedRoute, private rating: RatingsService, 
              private favorites: FavoritesService, private auth: AuthService, private clients: ClientsService,
              private toastr: ToastrService, private fb: FormBuilder, private cart: CartService, 
              private router: Router) { }

  public form: FormGroup;

  idUrl: string = this.route.snapshot.paramMap.get('id');
  productList: Menu[] = [];
  currentUser: Client;

  ratingList: Rating[] = [];
  ratingLength: number = 0;
  ratingAverage: number = 1;

  showSpinner: boolean = true;
  isLogged: any = {
    "status": false,
    "username": ""
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      stars: new FormControl('', [Validators.required, Validators.pattern('[1-5]')]),
      comment: new FormControl('')
    });

    this.getCurrentUserId();
    this.getMenu();
  }

  getCurrentUserId(): void {
    this.auth._userStatus$.subscribe(res => {
      this.isLogged.status = res.logged;
      this.isLogged.username = res.username;
      this.clients.getClientByUsername(res.username).subscribe((val: any) => {
        this.currentUser = val[0];
      });
    });
  }

  getMenu(): void {
    this.menus.getMenuById(parseInt(this.idUrl)).subscribe(res => {
      this.productList = res;
      this.showSpinner = false;
      
      this.productList[0].ingredients = this.productList[0].ingredients.slice(1, -1);

      this.getRating();
    });

  }

  addFavorite(client_id: number, menu_id: number): void {
    if (this.isLogged.status) {
      this.favorites.getFavoritesByClient(client_id).subscribe((res: any) => {
        const hasFavorite = res.findIndex((val) => val.menu_id == menu_id);
        if (hasFavorite >= 0) {
          this.toastr.error('Este producto ya está en favoritos', 'Error');
        }
        else {
          this.favorites.addFavorite(client_id, menu_id).subscribe(res => console.log(res));
          this.toastr.success('Producto agregado exitosamente', 'Nuevo favorito', {
            positionClass: 'toast-top-left'
          });
        }
      });
    }
    else {
      this.router.navigate(['/login']).then(() => this.toastr.info('Necesitas iniciar sesión para tener favoritos'));
    }
  }

  getRating(): void {
    let menu_id = this.productList[0].menu_id;
    
    this.rating.getRatingByMenu(menu_id).subscribe(res => {
      this.ratingList = res;
      this.ratingLength = this.ratingList.length;
      let suma = 0;

      this.ratingList.forEach(el => {
        suma += el.stars;
      });

      this.ratingAverage = Math.ceil(suma / this.ratingLength);
    });
  }
  
  addProduct(product: Menu): void {
    if (this.isLogged.status) {
      this.cart.addProduct(product);
    }
    else {
      this.router.navigate(['/login']).then(() => this.toastr.info('Necesitas iniciar sesión para comprar'));
    }
  }

  submitComment(data: any): void {
    this.clients.getClientByUsername(this.isLogged.username).subscribe(async (res: any) => {
      let form = {
        "client_id": res[0].client_id,
        "menu_id": parseInt(this.idUrl),
        "stars": data.stars,
        "comment": data.comment
      }

      await this.rating.postFavorite(form).subscribe(res => console.log(res));
      this.form.reset();
      this.toastr.success('Comentario publicado con éxito', 'Nuevo comentario');
    });
  }
}
