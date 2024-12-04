import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectApi = 'http://localhost:3000/project';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get<any>(this.projectApi);
  }

  addProject(projectData: FormData): Observable<any> {
    return this.http.post<any>(this.projectApi, projectData);
  }

  updateProject(_id: string, projectData: FormData): Observable<any> {
    return this.http.put<any>(`${this.projectApi}/${_id}`, projectData);
  }

  deleteProject(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.projectApi}/${_id}`);
  }
}
