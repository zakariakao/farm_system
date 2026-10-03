import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimalGroup } from '../../models/animalGroup.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class AnimalGroupService {
  private apiUrl = 'http://localhost:5000/api/animal-groups';

  constructor(private http: HttpClient) {}

  getAllAnimalGroups(): Observable<AnimalGroup[]> {
    return this.http.get<ApiResponse<AnimalGroup[]>>(this.apiUrl)
      .pipe(map(response => response.data));
  }

  getAnimalGroup(id: string): Observable<AnimalGroup> {
    return this.http.get<ApiResponse<AnimalGroup>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  createAnimalGroup(animalGroup: AnimalGroup): Observable<AnimalGroup> {
    return this.http.post<ApiResponse<AnimalGroup>>(this.apiUrl, animalGroup)
      .pipe(map(response => response.data));
  }

  updateAnimalGroup(id: string, animalGroup: AnimalGroup): Observable<AnimalGroup> {
    return this.http.put<ApiResponse<AnimalGroup>>(`${this.apiUrl}/${id}`, animalGroup)
      .pipe(map(response => response.data));
  }

  deleteAnimalGroup(id: string): Observable<AnimalGroup> {
    return this.http.delete<ApiResponse<AnimalGroup>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

}
