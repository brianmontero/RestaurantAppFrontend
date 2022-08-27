import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {

  constructor(private clients: ClientsService) { }

  clientList: Client[];

  showSpinner: boolean = true;

  ngOnInit(): void {
    this.clients.getClients().subscribe(res => {
      this.clientList = res;
      this.showSpinner = false;
    });
  }

  onSearch(event: any): void {
    const value = event.target.value;

    if (value == '') {
      this.ngOnInit();
    }
    else {
      this.clientList = this.clientList.filter(res => {
        return res.username.toLocaleLowerCase().match(value.toLocaleLowerCase());
      });
    }
  }

}
