import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
experienceApi = 'http://localhost:3000/experience';
  constructor(private _http:HttpClient) { }

  getExperiences():Observable<any>{
  return this._http.get<any>(this.experienceApi);
  }


}

