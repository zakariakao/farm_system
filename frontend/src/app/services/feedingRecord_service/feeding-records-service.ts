import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeedingRecord } from '../../models/feedingRecord.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class FeedingRecordsService {
  private apiUrl = 'http://localhost:5000/api/feeding-records';

  constructor(private http: HttpClient) {}

  getAllFeedingRecords(): Observable<FeedingRecord[]> {
    return this.http.get<ApiResponse<FeedingRecord[]>>(this.apiUrl)
      .pipe(map(response => response.data));
  }

  getFeedingRecord(id: string): Observable<FeedingRecord> {
    return this.http.get<ApiResponse<FeedingRecord>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  createFeedingRecord(feedingRecord: FeedingRecord): Observable<FeedingRecord> {
    return this.http.post<ApiResponse<FeedingRecord>>(this.apiUrl, feedingRecord)
      .pipe(map(response => response.data));
  }

  updateFeedingRecord(id: string, feedingRecord: FeedingRecord): Observable<FeedingRecord> {
    return this.http.put<ApiResponse<FeedingRecord>>(`${this.apiUrl}/${id}`, feedingRecord)
      .pipe(map(response => response.data));
  }

  deleteFeedingRecord(id: string): Observable<FeedingRecord> {
    return this.http.delete<ApiResponse<FeedingRecord>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }
}
