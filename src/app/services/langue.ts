import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangueService {

  private apiUrl = 'http://127.0.0.1:8000/api/langues';

  constructor(private http: HttpClient) {}

  getLangues(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getLangue(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createLangue(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateLangue(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteLangue(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
