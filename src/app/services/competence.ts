import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/competences';

  getCompetences(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCompetence(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createCompetence(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateCompetence(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteCompetence(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
