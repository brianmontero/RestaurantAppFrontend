import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private _URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this._URL}/menus`);
  }

  getMenuById(id: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this._URL}/menu/${id}`);
  }

  addMenu(data: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this._URL}/add/menu`, data);
  }

  editMenu(id: number, data: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this._URL}/edit/menu/${id}`, data);
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete(`${this._URL}/delete/menu/${id}`);
  }

  // GET de categorías
  
  getPastas(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this._URL}/menus`).pipe(
      map(data => {
        return data.filter(res => res.category === 'pasta');
      })
    );
  }

  getSalads(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this._URL}/menus`).pipe(
      map(data => {
        return data.filter(res => res.category === 'salad')
      })
    );
  }

  getVegan(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this._URL}/menus`).pipe(
      map(data => {
        return data.filter(res => res.category === 'vegan')
      })
    );
  }

  getBreakfast(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this._URL}/menus`).pipe(
      map(data => {
        return data.filter(res => res.category === 'breakfast')
      })
    );
  }
  
}
