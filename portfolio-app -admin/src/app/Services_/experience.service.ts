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

  addExperience(formData:FormData):Observable<any>{
    return this._http.post<any>(this.experienceApi,formData)
}
  updateExperience(id: string,formData:FormData):Observable<any>{
    const url = `${this.experienceApi}/${id}`
    return this._http.put<any>(url,formData)
}
  deleteExperience(id: string):Observable<any>{
      const url = `${this.experienceApi}/${id}`
    return this._http.delete<any>(url);
}

}

