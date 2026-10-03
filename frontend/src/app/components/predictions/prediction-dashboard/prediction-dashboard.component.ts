import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionService } from '../../../services/prediction_service/prediction.service';
import { StockPrediction, DashboardSummary, SubgroupConsumption } from '../../../models/prediction.model';

/**
 * Smart Stock Prediction Component
 * Displays intelligent predictions for forage stock management
 * including consumption analysis and stock rupture forecasting
 */
@Component({
  selector: 'app-prediction-dashboard',
  imports: [CommonModule],
  templateUrl: './prediction-dashboard.component.html',
  styleUrl: './prediction-dashboard.component.css',
})
export class PredictionDashboardComponent implements OnInit {

  // Services
  predictionService = inject(PredictionService);
  private cdr = inject(ChangeDetectorRef);

  // Data properties
  predictions: StockPrediction[] = [];
  dashboardSummary: DashboardSummary | null = null;
  subgroupConsumption: SubgroupConsumption[] = [];
  
  // Loading and error states
  isLoading: boolean = true;
  isError: boolean = false;
  errorContent: string = '';

  // Filter state
  selectedFilter: string = 'all'; // 'all', 'critical', 'warning', 'normal'
  filteredPredictions: StockPrediction[] = [];

  // View toggle
  showConsumptionStats: boolean = false;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * Load all dashboard data
   */
  loadDashboardData(): void {
    this.isLoading = true;
    this.isError = false;

    // Load predictions and summary
    this.predictionService.getAllPredictions().subscribe({
      next: (predictions) => {
        this.predictions = predictions;
        this.filteredPredictions = predictions;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorContent = 'Failed to load stock predictions. Please try again.';
        this.isError = true;
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error('Error loading predictions:', error);
      }
    });

    // Load dashboard summary
    this.predictionService.getDashboardSummary().subscribe({
      next: (summary) => {
        this.dashboardSummary = summary;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading summary:', error);
      }
    });

    // Load subgroup consumption stats
    this.predictionService.getConsumptionBySubgroups().subscribe({
      next: (consumption) => {
        this.subgroupConsumption = consumption;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading consumption stats:', error);
      }
    });
  }

  /**
   * Filter predictions by alert level
   */
  filterPredictions(filter: string): void {
    this.selectedFilter = filter;

    if (filter === 'all') {
      this.filteredPredictions = this.predictions;
    } else {
      this.filteredPredictions = this.predictions.filter(
        p => p.alert_level === filter
      );
    }
    this.cdr.detectChanges();
  }

  /**
   * Get badge class for alert level
   */
  getAlertBadgeClass(alertLevel: string): string {
    return this.predictionService.getAlertBadgeClass(alertLevel);
  }

  /**
   * Get alert level display text
   */
  getAlertLevelText(alertLevel: string): string {
    return this.predictionService.getAlertLevelText(alertLevel);
  }

  /**
   * Format days remaining for display
   */
  formatDaysRemaining(daysRemaining: number | null): string {
    return this.predictionService.formatDaysRemaining(daysRemaining);
  }

  /**
   * Check if stock needs order
   */
  needsOrder(prediction: StockPrediction): boolean {
    return prediction.suggested_order_quantity > 0;
  }

  /**
   * Toggle consumption statistics view
   */
  toggleConsumptionStats(): void {
    this.showConsumptionStats = !this.showConsumptionStats;
    this.cdr.detectChanges();
  }

  /**
   * Refresh all data
   */
  refreshData(): void {
    this.loadDashboardData();
  }

  /**
   * Calculate stock health percentage
   */
  getStockHealthPercentage(prediction: StockPrediction): number {
    if (!prediction.days_remaining) return 0;
    // Consider 30 days as 100% healthy
    return Math.min(100, (prediction.days_remaining / 30) * 100);
  }

  /**
   * Get stock health color
   */
  getStockHealthColor(percentage: number): string {
    if (percentage < 10) return '#dc2626';
    if (percentage < 23) return '#f59e0b';
    return '#10b981';
  }
}
