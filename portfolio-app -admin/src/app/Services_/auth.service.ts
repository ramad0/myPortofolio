import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient,private _router:Router) { }

private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string|null>(null);

getAccessToken():string | null{
  return localStorage.getItem('accesstoken')
}

isLogedin():boolean{
  return this.tokenSubject.value !== null
}

logOut(){
  localStorage.removeItem('accesstoken');
  this.tokenSubject.next(null);
  console.log('logout');
  this._router.navigate(['login'])
}
  loginUrl = 'http://localhost:3000/user/login';
  postLogin(userName: string, passWord: string): Observable<any> {
    return this._http.post<any>(this.loginUrl, { userName: userName, passWord: passWord }).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem('accesstoken',response);
          this.tokenSubject.next(response.accessToken);
          console.log(response.accessToken);
        }
      })
    )
  }

}
