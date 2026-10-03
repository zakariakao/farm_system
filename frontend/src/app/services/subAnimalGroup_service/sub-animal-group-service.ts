import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubAnimalGroup } from '../../models/subAnimalGroup.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class SubAnimalGroupService {
  private apiUrl = 'http://localhost:5000/api/sub-animal-groups';

  constructor(private http: HttpClient) {}

  getAllSubAnimalGroups(): Observable<SubAnimalGroup[]> {
    return this.http.get<ApiResponse<SubAnimalGroup[]>>(this.apiUrl)
      .pipe(map(response => response.data));
  }

  getSubAnimalGroup(id: string): Observable<SubAnimalGroup> {
    return this.http.get<ApiResponse<SubAnimalGroup>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  createSubAnimalGroup(subAnimalGroup: SubAnimalGroup): Observable<SubAnimalGroup> {
    return this.http.post<ApiResponse<SubAnimalGroup>>(this.apiUrl, subAnimalGroup)
      .pipe(map(response => response.data));
  }

  updateSubAnimalGroup(id: string, subAnimalGroup: SubAnimalGroup): Observable<SubAnimalGroup> {
    return this.http.put<ApiResponse<SubAnimalGroup>>(`${this.apiUrl}/${id}`, subAnimalGroup)
      .pipe(map(response => response.data));
  }

  deleteSubAnimalGroup(id: string): Observable<SubAnimalGroup> {
    return this.http.delete<ApiResponse<SubAnimalGroup>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }
}
