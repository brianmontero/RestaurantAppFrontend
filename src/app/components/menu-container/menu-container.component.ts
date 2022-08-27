import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css']
})
export class MenuContainerComponent implements OnInit {

  @Input() category: string;

  public menuList: Menu[];
  totalLength: number;
  page: number = 1;

  showSpinner: boolean = true;

  constructor(private menus: MenusService, private routes: Router) { }

  ngOnInit(): void {
    switch (this.category) {
      case 'pasta':
        this.menus.getPastas().subscribe(res => {
          this.menuList = res;
          this.totalLength = this.menuList.length;
          this.showSpinner = false;
        });
        break;
      case 'salad': 
        this.menus.getSalads().subscribe(res => {
          this.menuList = res;
          this.totalLength = this.menuList.length;
          this.showSpinner = false;
        });
        break;
      case 'vegan':
        this.menus.getVegan().subscribe(res => {
          this.menuList = res;
          this.totalLength = this.menuList.length;
          this.showSpinner = false;
        });
        break;
      case 'breakfast':
        this.menus.getBreakfast().subscribe(res => {
          this.menuList = res;
          this.totalLength = this.menuList.length;
          this.showSpinner = false;
        });
        break;
      default:
        this.menus.getMenus().subscribe(res => {
          this.menuList = res;
          this.totalLength = this.menuList.length;
          this.showSpinner = false;
        });
    }
  }

  productSelected(item: Menu): void {
    this.routes.navigate(['/product', item.menu_id]);
  }

}
