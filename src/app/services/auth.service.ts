import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Client } from '../models/client.model';
import { ClientsService } from './clients.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _userStatus$: BehaviorSubject<any> = new BehaviorSubject<any>({"username": null, "logged": false});
  private _URL: string = 'http://localhost:3000';
  private usernamesArr: string[] = [];

  constructor (private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router, 
  private client: ClientsService) { 
    this._getUserStatus();
    this.client.getClients().subscribe(res => {
      res.forEach(el => {
        this.usernamesArr.push(el.username);
      });
    });
  }

  login(user: any): Observable<string> {
    return this.http.post<string>(`${this._URL}/login`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this._userStatus$.next({"username": null, "token": false});
    this.router.navigate(['/']);
  }

  register(data: Client): Observable<Client> {
    return this.http.post<Client>(`${this._URL}/register`, data);
  }

  checkUsernameValidity(username: string): boolean {
    if (this.usernamesArr.includes(username)) {
      return false;
    }
    return true;
  }

  // Current user observable

  async _getUserStatus(): Promise<void> {
    const token = localStorage.getItem('token');
    const decoded = await this.jwtHelper.decodeToken(token);
    const username = await decoded.username;

    if (!this.jwtHelper.isTokenExpired(token) && token != null) {
      this._userStatus$.next({"username": username, "logged": true});
    }
    else {
      this._userStatus$.next({"username": null, "logged": false});
    }

  }

}