import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  private _URL: string = 'http://localhost:3000';

  getSales(): Observable<any[]> {
    return this.http.get<any[]>(`${this._URL}/sales`);
  }

  getSalesByClientId(client_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this._URL}/sales/client/${client_id}`);
  }

  postSale(data: any): Observable<any> {
    return this.http.post<any>(`${this._URL}/add/sale`, data);
  }
}
