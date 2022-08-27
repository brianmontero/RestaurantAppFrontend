import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

  _URL: string = 'http://localhost:3000';

  addFavorite(client_id: number, menu_id: number): Observable<any> {
    let data = {client_id, menu_id};
    return this.http.post<any>(`${this._URL}/add/favorite/${client_id}/${menu_id}`, data);
  }

  getFavoritesByClient(client_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this._URL}/get/favorites/${client_id}`);
  }

  deleteProduct(client_id: number, menu_id: number): Observable<any> {
    return this.http.delete<any>(`${this._URL}/delete/favorite/${client_id}/${menu_id}`);
  }
}
