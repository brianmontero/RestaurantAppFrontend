import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/models/menu.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  constructor(private menuService: MenusService, private fb: FormBuilder) { }

  public form: FormGroup;

  selectedMenu: Menu;
  defaultMenu: Menu;

  _menuNotFound: boolean = false;
  _deleted: boolean = false;

  title: string;
  description: string;
  price: number;
  image: string;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', Validators.required),
      price: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      image: this.fb.control('', Validators.required)
    });
  }

  selectMenu(id: string): void {
    this.menuService.getMenuById(parseInt(id)).subscribe(res => {
      if (res.length === 0) {
        this._deleted = false;
        this._menuNotFound = true;
        this.selectedMenu = null;
      }
      else {
        this._deleted = false;
        this._menuNotFound = false;

        this.selectedMenu = res[0];
        this.defaultMenu = res[0];
  
        this.title = res[0].title;
        this.description = res[0].menu_description;
        this.price = res[0].price;
        this.image = res[0].image;
      }
    });
  }

  toDefault(): void {
    this.title = this.defaultMenu.title;
    this.description = this.defaultMenu.menu_description;
    this.price = this.defaultMenu.price;
    this.image = this.defaultMenu.image;
  }

  onSubmit(): void {
    const id = this.selectedMenu.menu_id;
    let form = {
      "title": this.title,
      "ingredients": this.selectedMenu.ingredients,
      "menu_description": this.description,
      "price": this.price,
      "category": this.selectedMenu.category,
      "image": this.image
    };

    this.menuService.editMenu(id, form).subscribe(res => console.log(res));
    this._deleted = true;
  }

}