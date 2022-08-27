import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-history-design',
  templateUrl: './history-design.component.html',
  styleUrls: ['./history-design.component.css']
})
export class HistoryDesignComponent implements OnInit {

  constructor(private sales: SalesService, private auth: AuthService, private client: ClientsService) { }

  salesList: any[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.auth._userStatus$.subscribe(res => {
      this.client.getClientByUsername(res.username).subscribe(v => {
        this.sales.getSalesByClientId(v[0].client_id).subscribe(val => {
          this.salesList = val;

          this.salesList.forEach((el: any) => {
            this.total += el.total;
            let date = el.date.split('T').join(' ').slice(0, -5);
            let hour = date.split(' ')[1].split(':');
            hour = `${hour[0] - 3}:${hour[1]}:${hour[2]}`;
            let finalDate = `${date.slice(0, -9)} / ${hour}`;
            el.date = finalDate;
          });
        });
      });
    });
  }

}
