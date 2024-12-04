import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private servicesApi = 'http://localhost:3000/services'; 

  constructor(private http: HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get<any>(this.servicesApi);
  }

  addService(serviceData: any): Observable<any> {
    return this.http.post<any>(this.servicesApi, serviceData);
  }

  updateService(_id: string, serviceData: any): Observable<any> {
    return this.http.put<any>(`${this.servicesApi}/${_id}`, serviceData);
  }

  deleteService(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.servicesApi}/${_id}`);
  }
}
