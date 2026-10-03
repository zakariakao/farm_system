import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fourage } from '../../models/fourage.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class FourageService {
  private apiUrl = 'http://localhost:5000/api/fourages';

  constructor(private http: HttpClient) {}

  getAllFourages(): Observable<Fourage[]> {
    return this.http.get<ApiResponse<Fourage[]>>(this.apiUrl)
      .pipe(map(response => response.data));
  }

  getFourage(id: string): Observable<Fourage> {
    return this.http.get<ApiResponse<Fourage>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  createFourage(fourage: Fourage): Observable<Fourage> {
    return this.http.post<ApiResponse<Fourage>>(this.apiUrl, fourage)
      .pipe(map(response => response.data));
  }

  updateFourage(id: string, fourage: Fourage): Observable<Fourage> {
    return this.http.put<ApiResponse<Fourage>>(`${this.apiUrl}/${id}`, fourage)
      .pipe(map(response => response.data));
  }

  deleteFourage(id: string): Observable<Fourage> {
    return this.http.delete<ApiResponse<Fourage>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }
}
