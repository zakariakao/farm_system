import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  // 🔹 Get all users (admin)
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<ApiResponse<User[]>>(this.apiUrl)
      .pipe(map(response => response.data));
  }

  // 🔹 Get user by ID
  getUserById(id: string): Observable<User> {
    return this.http
      .get<ApiResponse<User>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  // 🔹 Create user (register)
  createUser(user: User): Observable<User> {
    return this.http
      .post<ApiResponse<User>>(this.apiUrl, user)
      .pipe(map(response => response.data));
  }

  // 🔹 Update user
  updateUser(id: string, user: User): Observable<User> {
    return this.http
      .put<ApiResponse<User>>(`${this.apiUrl}/${id}`, user)
      .pipe(map(response => response.data));
  }

  // 🔹 Delete user
  deleteUser(id: string): Observable<User> {
    return this.http
      .delete<ApiResponse<User>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  // 🔹 Get current logged-in user profile
  getProfile(): Observable<User> {
    return this.http
      .get<ApiResponse<User>>(`${this.apiUrl}/profile`)
      .pipe(map(response => response.data));
  }
}
