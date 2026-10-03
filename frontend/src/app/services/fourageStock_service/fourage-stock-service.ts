import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FourageStock } from '../../models/fourageStock.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class FourageStockService {
  private apiUrl = 'http://localhost:5000/api/fourage-stocks';

  constructor(private http: HttpClient) {}

  getAllFourageStocks(): Observable<FourageStock[]> {
    return this.http.get<ApiResponse<FourageStock[]>>(this.apiUrl)
      .pipe(map(response => response.data));
  }

  getFourageStock(id: string): Observable<FourageStock> {
    return this.http.get<ApiResponse<FourageStock>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  createFourageStock(fourageStock: FourageStock): Observable<FourageStock> {
    return this.http.post<ApiResponse<FourageStock>>(this.apiUrl, fourageStock)
      .pipe(map(response => response.data));
  }

  updateFourageStock(id: string, fourageStock: FourageStock): Observable<FourageStock> {
    return this.http.put<ApiResponse<FourageStock>>(`${this.apiUrl}/${id}`, fourageStock)
      .pipe(map(response => response.data));
  }

  deleteFourageStock(id: string): Observable<FourageStock> {
    return this.http.delete<ApiResponse<FourageStock>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  getLowStocks() {
    return this.http.get<ApiResponse<FourageStock[]>>(`${this.apiUrl}/low-stock`)
      .pipe(map(response => response.data));
  }
}
