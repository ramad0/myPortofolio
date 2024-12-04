import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private homeApi = 'http://localhost:3000/home';

  constructor(private _http: HttpClient) {}

  getHome(): Observable<any> {
    return this._http.get<any>(this.homeApi);
  }

  addHome(formData: FormData): Observable<any> {
    return this._http.post<any>(this.homeApi, formData);
  }

  updateHome(id: string, formData: FormData): Observable<any> {
    return this._http.put<any>(`${this.homeApi}/${id}`, formData);
  }

  deleteHome(id: string): Observable<any> {
    return this._http.delete<any>(`${this.homeApi}/${id}`);
  }
}
