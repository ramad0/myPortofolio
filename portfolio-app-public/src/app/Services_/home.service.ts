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

}
