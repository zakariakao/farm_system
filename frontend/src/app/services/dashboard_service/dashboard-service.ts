import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private subGroupsApi = 'http://localhost:5000/api/sub-animal-groups/totalAnimals';
  private supplierApi = 'http://localhost:5000/api/suppliers/totalSuppliers';
  private fourageApi = 'http://localhost:5000/api/fourages/totalFourages';
  private workerApi = 'http://localhost:5000/api/user/totalWorkers';
  private groupsApi = 'http://localhost:5000/api/animal-groups/totalGroups';
  private subGroupApi2 = 'http://localhost:5000/api/sub-animal-groups/totalSubGroups';

  constructor(private http: HttpClient) {}

  getTotalAnimals(): Observable<number> {
    return this.http.get<ApiResponse<number>>(this.subGroupsApi).pipe(
      map(response => response.data)
    );
  }

  getTotalSuppliers() {
    return this.http.get<ApiResponse<number>>(this.supplierApi).pipe(
      map(response => response.data)
    );
  }

  getTotalFourages() {
    return this.http.get<ApiResponse<number>>(this.fourageApi).pipe(
      map(response => response.data)
    );
  }

  getTotalWorkers() {
    return this.http.get<ApiResponse<number>>(this.workerApi).pipe(
      map(response => response.data)
    );
  }

  getTotalGroups() {
    return this.http.get<ApiResponse<number>>(this.groupsApi).pipe(
      map(response => response.data)
    );
  }

  getTotalSubGroups() {
    return this.http.get<ApiResponse<number>>(this.subGroupApi2).pipe(
      map(response => response.data)
    );
  }
}
