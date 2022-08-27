import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  constructor (private menus: MenusService, private routes: Router) { }

  search: string;
  menuList: Menu[];
  defaultList: Menu[];
  currentCategory: string;

  showSpinner = true;

  ngOnInit(): void {
    this.menus.getMenus().subscribe(res => {
      this.menuList = res;
      this.defaultList = res;
      this.showSpinner = false;
    });
  }

  selectedCategory(e: any): void {
    this.currentCategory = e.srcElement.id;

    switch (e.srcElement.id) {
      case 'btnradio1':
        this.ngOnInit();
        break;
      case 'btnradio2':
        this.menuList = this.defaultList;
        this.menuList = this.menuList.filter(el => {
          return el.category === 'pasta';
        });
        break;
      case 'btnradio3':
        this.menuList = this.defaultList;
        this.menuList = this.menuList.filter(el => {
          return el.category === 'salad';
        });
        break;
      case 'btnradio4':
        this.menuList = this.defaultList;
        this.menuList = this.menuList.filter(el => {
          return el.category === 'vegan';
        });
        break;
      case 'btnradio5':
        this.menuList = this.defaultList;
        this.menuList = this.menuList.filter(el => {
          return el.category === 'breakfast';
        });
        break;
      default:
        this.ngOnInit();
        break;
    }
  }

  selectedProduct(item: Menu): void {
    this.routes.navigate(['/product', item.menu_id]);
  }

  emittingSearch(e: any): void {
    if (this.search == '') {
      this.ngOnInit();
    }
    else {
      this.menuList = this.menuList.filter(res => {
        return res.title.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
      });
    }
  }

}
