import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private _URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this._URL}/users`);
  }

  getClientById(id: number): Observable<Client[]> {
    return this.http.get<Client[]>(`${this._URL}/user/${id}`);
  }

  getClientByUsername(username: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this._URL}/username/${username}`);
  }

  editUser(id: number, data: any): Observable<Client[]> {
    return this.http.put<Client[]>(`${this._URL}/edit/${id}`, data);
  }

  deleteUser(id: number): Observable<Client[]> {
    return this.http.delete<Client[]>(`${this._URL}/delete/${id}`);
  }
  
}
