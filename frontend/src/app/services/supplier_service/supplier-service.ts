import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '../../models/supplier.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = 'http://localhost:5000/api/suppliers';

  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<ApiResponse<Supplier[]>>(this.apiUrl)
      .pipe(map(response => response.data));
  }

  getSupplier(id: string): Observable<Supplier> {
    return this.http.get<ApiResponse<Supplier>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<ApiResponse<Supplier>>(this.apiUrl, supplier)
      .pipe(map(response => response.data));
  }

  updateSupplier(id: string, supplier: Supplier): Observable<Supplier> {
    return this.http.put<ApiResponse<Supplier>>(`${this.apiUrl}/${id}`, supplier)
      .pipe(map(response => response.data));
  }

  deleteSupplier(id: string): Observable<Supplier> {
    return this.http.delete<ApiResponse<Supplier>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }
}
