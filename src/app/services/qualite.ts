import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualiteService {

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/qualites';

  getQualites(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getQualite(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createQualite(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateQualite(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteQualite(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
