/**
 * Stock Prediction Model
 * Interface for intelligent stock prediction data
 */
export interface StockPrediction {
  stock_id: string;
  stock_name: string;
  fourage_name: string;
  supplier_name: string;
  current_quantity: number;
  alert_threshold: number;
  average_daily_consumption: number;
  total_consumed: number;
  days_analyzed: number;
  days_remaining: number | null;
  alert_level: 'critical' | 'warning' | 'normal' | 'unknown';
  suggested_order_quantity: number;
  has_feeding_data: boolean;
}

/**
 * Dashboard Summary Model
 * Interface for dashboard overview statistics
 */
export interface DashboardSummary {
  total_stocks: number;
  critical_stocks: number;
  warning_stocks: number;
  normal_stocks: number;
  total_suggested_orders: number;
  lowest_days_stock: {
    name: string;
    days_remaining: number;
  } | null;
  stocks_without_data: number;
}

/**
 * Subgroup Consumption Model
 * Interface for consumption statistics by subgroup
 */
export interface SubgroupConsumption {
  subgroup_id: string;
  subgroup_name: string;
  subgroup_type: string;
  animal_count: number;
  group_name: string;
  average_daily_consumption: number;
  total_consumed: number;
  days_analyzed: number;
  consumption_per_animal: number;
  has_feeding_data: boolean;
}

/**
 * Stock Consumption Model
 * Interface for consumption statistics by stock
 */
export interface StockConsumption {
  fourage_stock_id: string;
  average_daily_consumption: number;
  total_consumed: number;
  days_analyzed: number;
  record_count?: number;
  has_data: boolean;
}
