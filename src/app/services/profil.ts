import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/profils';

  getProfils(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProfil(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProfil(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateProfil(id: number, data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}?_method=PUT`, data);
  }

  deleteProfil(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
