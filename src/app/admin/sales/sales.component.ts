import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(private sale: SalesService) { }

  salesList: any[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.sale.getSales().subscribe(res => {
      this.salesList = res;

      this.salesList.forEach((el: any) => {
        this.total += el.total;
        let date = el.date.split('T').join(' ').slice(0, -5);
        let hour = date.split(' ')[1].split(':');
        hour = `${hour[0] - 3}:${hour[1]}:${hour[2]}`;
        let finalDate = `${date.slice(0, -9)} / ${hour}`;
        el.date = finalDate;
      });
    });
  }

}
