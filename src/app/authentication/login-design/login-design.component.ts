import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-design',
  templateUrl: './login-design.component.html',
  styleUrls: ['./login-design.component.css']
})
export class LoginDesignComponent implements OnInit {

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }

  public form: FormGroup;

  loginError: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('', Validators.required),
      client_password: this.fb.control('', Validators.required)
    }, { updateOn: 'submit' });
  }

  login(user: any): void {
    this.auth.login(user).subscribe(async (res: any) => {  
      localStorage.setItem('token', res.token);
      
      if (user.username == 'admin') {
        await this.auth._userStatus$.next({"username": 'admin', "logged": true});
        this.router.navigate(['/admin']);
      }
      else {
        await this.auth._userStatus$.next({"username": user.username, "logged": true});
        this.router.navigate(['/']);
      }
      
    },
    err => {
      this.loginError = true;
    });
  }

}
