import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private _URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this._URL}/ratings`);
  }

  postFavorite(data: any): Observable<any> {
    return this.http.post<any>(`${this._URL}/add/rating`, data);
  }

  getRatingByClient(client_id: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this._URL}/rating/client/${client_id}`);
  }

  getRatingByMenu(menu_id: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this._URL}/rating/menu/${menu_id}`);
  }
}
