import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  StockPrediction,
  DashboardSummary,
  SubgroupConsumption,
  StockConsumption
} from '../../models/prediction.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}

/**
 * Prediction Service
 * Handles all API calls related to stock predictions and consumption analysis
 */
@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private apiUrl = 'http://localhost:5000/api/predictions';

  constructor(private http: HttpClient) {}

  /**
   * Get all stock predictions
   * Main endpoint for prediction dashboard
   */
  getAllPredictions(): Observable<StockPrediction[]> {
    return this.http.get<ApiResponse<StockPrediction[]>>(this.apiUrl)
      .pipe(map(response => response.data));
  }

  /**
   * Get prediction for a specific stock
   * @param stockId - The forage stock ID
   */
  getPredictionByStockId(stockId: string): Observable<StockPrediction> {
    return this.http.get<ApiResponse<StockPrediction>>(`${this.apiUrl}/stock/${stockId}`)
      .pipe(map(response => response.data));
  }

  /**
   * Get dashboard summary with key metrics
   * Returns overview statistics for main dashboard
   */
  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<ApiResponse<DashboardSummary>>(`${this.apiUrl}/dashboard/summary`)
      .pipe(map(response => response.data));
  }

  /**
   * Get stocks with critical or warning alerts
   * Filtered view for urgent attention
   */
  getAlerts(): Observable<StockPrediction[]> {
    return this.http.get<ApiResponse<StockPrediction[]>>(`${this.apiUrl}/alerts`)
      .pipe(map(response => response.data));
  }

  /**
   * Get only critical stocks
   * Highest priority stocks requiring immediate action
   */
  getCriticalStocks(): Observable<StockPrediction[]> {
    return this.http.get<ApiResponse<StockPrediction[]>>(`${this.apiUrl}/critical`)
      .pipe(map(response => response.data));
  }

  /**
   * Get consumption statistics for all subgroups
   * Useful for analyzing which animal groups consume the most
   */
  getConsumptionBySubgroups(): Observable<SubgroupConsumption[]> {
    return this.http.get<ApiResponse<SubgroupConsumption[]>>(`${this.apiUrl}/consumption/subgroups`)
      .pipe(map(response => response.data));
  }

  /**
   * Get consumption data for a specific subgroup
   * @param subgroupId - The subgroup ID
   */
  getSubgroupConsumption(subgroupId: string): Observable<any> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/consumption/subgroup/${subgroupId}`)
      .pipe(map(response => response.data));
  }

  /**
   * Get consumption data for a specific stock
   * @param stockId - The forage stock ID
   */
  getStockConsumption(stockId: string): Observable<StockConsumption> {
    return this.http.get<ApiResponse<StockConsumption>>(`${this.apiUrl}/consumption/stock/${stockId}`)
      .pipe(map(response => response.data));
  }

  /**
   * Get alert level badge class for styling
   * @param alertLevel - The alert level
   */
  getAlertBadgeClass(alertLevel: string): string {
    switch (alertLevel) {
      case 'critical':
        return 'badge-critical';
      case 'warning':
        return 'badge-warning';
      case 'normal':
        return 'badge-normal';
      default:
        return 'badge-unknown';
    }
  }

  /**
   * Get alert level display text
   * @param alertLevel - The alert level
   */
  getAlertLevelText(alertLevel: string): string {
    switch (alertLevel) {
      case 'critical':
        return 'Critical';
      case 'warning':
        return 'Warning';
      case 'normal':
        return 'Normal';
      default:
        return 'Unknown';
    }
  }

  /**
   * Format days remaining display text
   * @param daysRemaining - Days until stock rupture
   */
  formatDaysRemaining(daysRemaining: number | null): string {
    if (daysRemaining === null) {
      return 'No data';
    }
    if (daysRemaining < 1) {
      return 'Less than 1 day';
    }
    return `${daysRemaining.toFixed(1)} days`;
  }
}
