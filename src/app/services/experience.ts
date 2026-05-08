import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/experiences';

  getExperiences(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getExperience(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createExperience(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateExperience(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
