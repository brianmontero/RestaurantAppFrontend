import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-register-design',
  templateUrl: './register-design.component.html',
  styleUrls: ['./register-design.component.css']
})
export class RegisterDesignComponent implements OnInit {

  constructor(private clients: ClientsService, private fb: FormBuilder, private auth: AuthService, 
    private route: Router, private toastr: ToastrService) { }

  hide: boolean = true;

  public form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.pattern(/(^|\s)admin($|\s)/i)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }, { updateOn: 'submit' });
  }

  hidePassword(): void {
    this.hide = !this.hide;
  }

  async registerUser(formValue: any): Promise<void> {
    let form = {
      "username": formValue.username,
      "email": formValue.email,
      "client_password": formValue.password,
      "role": "user"
    };

    await this.auth.register(form).subscribe(res => console.log(res));
    this.route.navigate(['/']).then(() => this.toastr.success('Usuario creado con éxito'));
  }

}
