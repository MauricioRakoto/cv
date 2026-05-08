import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudeService {

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/etudes';

  getEtudes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEtude(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createEtude(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateEtude(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEtude(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
