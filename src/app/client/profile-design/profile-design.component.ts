import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-profile-design',
  templateUrl: './profile-design.component.html',
  styleUrls: ['./profile-design.component.css']
})
export class ProfileDesignComponent implements OnInit {

  constructor(private auth: AuthService, private client: ClientsService) { }

  id: number = 0;
  username: string = "";
  email: string = "";
  password: string = "";

  clientUsername: string = "";
  defaultValues: Client;
  editing: boolean = true;
  hide: boolean = true;

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.auth._userStatus$.subscribe(res => this.clientUsername = res.username);
    this.client.getClientByUsername(this.clientUsername).subscribe(res => {
      this.defaultValues = res[0];

      this.id = res[0].client_id;
      this.username = res[0].username;
      this.email = res[0].email;
      this.password = res[0].client_password;
    });
  }

  async sendEdit(): Promise<void> {
    let form = {
      "client_id": this.id,
      "username": this.username,
      "email": this.email,
      "client_password": this.password,
      "role": "user"
    }

    await this.client.editUser(this.id, form).subscribe((res: any) => console.log(res));
    this.auth.logout();
  }

  default(): void {
    this.username = this.defaultValues.username;
    this.email = this.defaultValues.email;
    this.password = this.defaultValues.client_password;
  }

  editProfile(): void {
    this.editing = !this.editing;
  }

  hidePassword(): void {
    this.hide = !this.hide;
  }

  cancelled(): void {
    this.default();
    this.editing = !this.editing;    
  }

}
