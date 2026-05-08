import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoisirsService {

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/loisirs';

  getLoisirs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getLoisir(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createLoisir(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateLoisir(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteLoisir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
