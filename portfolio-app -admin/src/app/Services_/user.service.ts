import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userApi = 'http://localhost:3000/user';
  constructor(private _http:HttpClient ,private _auth :AuthService) { }

  getAllUsers():Observable<any>{
    const accessToken = this._auth.getAccessToken();
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${accessToken}`
    })
    return this._http.get<any>(this.userApi,{headers});
    }
}
