import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client.model';
import { Rating } from 'src/app/models/rating.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() item: Rating;
  clientList: Client[] = [];

  constructor(private client: ClientsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    let client_id = this.item.client_id;
    this.client.getClientById(client_id).subscribe(res => {
      this.clientList = res;
    });
  }

  report(): void {
    this.toastr.success('Comentario reportado con éxito');
  }

}
