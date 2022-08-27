import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { RatingsService } from 'src/app/services/ratings.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() item: Menu;
  average: number;

  constructor(private ratings: RatingsService) { }

  ngOnInit(): void {
    this.rating();
  }

  rating(): void {
    this.ratings.getRatingByMenu(this.item.menu_id).subscribe(res => {
      let suma = 0;
      let length = res.length;

      res.forEach(el => {
        suma += el.stars;
        this.average = Math.ceil(suma / length);
      });
    });
  }

}
