import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.css']
})
export class DeleteMenuComponent implements OnInit {

  constructor(private menuService: MenusService) { }

  selectedMenu: Menu[] = [];

  _menuNotFound: boolean = false;
  _menuDeleted: boolean = false;

  ngOnInit(): void {
  }

  searchMenu(id: string): void {
    this.menuService.getMenuById(parseInt(id)).subscribe(res => {
      this.selectedMenu = [];
      if (res.length === 0) {
        this._menuNotFound = true;
      }
      else {
        this.selectedMenu = res;
        this._menuNotFound = false;
      }
    });
  }

  async deleteMenu(id: number): Promise<void> {
    await this.menuService.deleteMenu(id).subscribe(res => console.log(res));
    this.selectedMenu = [];
    this._menuDeleted = true;
  }

}
