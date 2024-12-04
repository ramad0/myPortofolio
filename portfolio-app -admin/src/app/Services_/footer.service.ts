import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private footerApi = 'http://localhost:3000/footer';

  constructor(private http: HttpClient) {}

  getFooters(): Observable<any> {
    return this.http.get<any>(this.footerApi);
  }

  addFooter(footerData: any): Observable<any> {
    return this.http.post<any>(this.footerApi, footerData);
  }

  updateFooter(_id: string, footerData: any): Observable<any> {
    return this.http.put<any>(`${this.footerApi}/${_id}`, footerData);
  }

  deleteFooter(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.footerApi}/${_id}`);
  }
}


// addFooter(footer: { footer_name: string }): Observable<any> {
//     return this._http.post<any>(this.footerApi, footer);
//   }
