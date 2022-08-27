import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'

import { LoginDesignComponent } from './login-design/login-design.component';
import { RegisterDesignComponent } from './register-design/register-design.component';


@NgModule({
  declarations: [
    LoginDesignComponent,
    RegisterDesignComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginDesignComponent,
    RegisterDesignComponent
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})
export class AuthenticationModule { }
