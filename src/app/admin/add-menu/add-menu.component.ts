import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Menu } from 'src/app/models/menu.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  constructor(private fb: FormBuilder, private menuService: MenusService) { }

  public form: FormGroup;

  _successOnSubmit: boolean = false;
  _errorOnSubmit: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      ing1: this.fb.control('', [Validators.required]),
      ing2: this.fb.control('', [Validators.required]),
      ing3: this.fb.control(''),
      ing4: this.fb.control(''),
      description: this.fb.control('', Validators.required),
      price: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      category: this.fb.control('', Validators.required),
      image: this.fb.control('', Validators.required)
    }, { updateOn: 'submit' });
  }

  async onSubmit(formValue: any): Promise<void> {
    const formSubmit = {
      "title": formValue.title,
      "ingredients": [
        formValue.ing1,
        formValue.ing2,
        formValue.ing3,
        formValue.ing4
      ],
      "menu_description": formValue.description,
      "price": formValue.price,
      "category": formValue.category,
      "image": formValue.image
    }

    await this.menuService.addMenu(formSubmit).subscribe(res => {
      console.log(res);
    });
    this._successOnSubmit = true;
    
  }
  
  submitError(): void {
    this._successOnSubmit = false;
    this._errorOnSubmit = !this._errorOnSubmit;
  }

}
