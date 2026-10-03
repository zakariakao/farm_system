const FeedingRecord = require('../models/feedingRecord.model');
const FourageStock = require('../models/fourageStock.model');
const SubAnimalGroup = require('../models/subAnimalGroup.model');

/**
 * Prediction Service
 * Provides intelligent predictions for forage stock management
 * including consumption analysis and stock rupture forecasting
 */
class PredictionService {

    /**
     * Calculate average daily consumption for a specific SubAnimalGroup
     * @param {String} subgroupId - The SubAnimalGroup ID
     * @returns {Object} { subgroup_id, average_daily_consumption, total_consumed, days_analyzed }
     */
    async calculateAverageDailyConsumption(subgroupId) {
        try {
            // Fetch all feeding records for this subgroup
            const feedingRecords = await FeedingRecord.find({ subgroup_id: subgroupId })
                .sort({ datetime: 1 }); // Sort by date ascending

            if (!feedingRecords || feedingRecords.length === 0) {
                return {
                    subgroup_id: subgroupId,
                    average_daily_consumption: 0,
                    total_consumed: 0,
                    days_analyzed: 0,
                    has_data: false
                };
            }

            // Calculate total consumed quantity
            const totalConsumed = feedingRecords.reduce((sum, record) => sum + record.quantity, 0);

            // Get first and last feeding dates
            const firstDate = new Date(feedingRecords[0].datetime);
            const lastDate = new Date(feedingRecords[feedingRecords.length - 1].datetime);

            // Calculate number of days between first and last feeding
            const daysDifference = Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24));
            const daysAnalyzed = daysDifference > 0 ? daysDifference : 1; // Minimum 1 day

            // Calculate average daily consumption
            const averageDailyConsumption = totalConsumed / daysAnalyzed;

            return {
                subgroup_id: subgroupId,
                average_daily_consumption: parseFloat(averageDailyConsumption.toFixed(2)),
                total_consumed: parseFloat(totalConsumed.toFixed(2)),
                days_analyzed: daysAnalyzed,
                has_data: true
            };
        } catch (error) {
            throw new Error(`Error calculating average consumption: ${error.message}`);
        }
    }

    /**
     * Calculate average daily consumption grouped by fourage stock
     * @param {String} fourageStockId - The FourageStock ID
     * @returns {Object} Consumption statistics for the stock
     */
    async calculateConsumptionByFourageStock(fourageStockId) {
        try {
            // Use MongoDB aggregation for optimized query
            const result = await FeedingRecord.aggregate([
                {
                    $match: { fourage_stock_id: fourageStockId }
                },
                {
                    $group: {
                        _id: null,
                        totalConsumed: { $sum: '$quantity' },
                        recordCount: { $sum: 1 },
                        minDate: { $min: '$datetime' },
                        maxDate: { $max: '$datetime' }
                    }
                }
            ]);

            if (!result || result.length === 0) {
                return {
                    fourage_stock_id: fourageStockId,
                    average_daily_consumption: 0,
                    total_consumed: 0,
                    days_analyzed: 0,
                    has_data: false
                };
            }

            const data = result[0];
            const daysDifference = Math.ceil((data.maxDate - data.minDate) / (1000 * 60 * 60 * 24));
            const daysAnalyzed = daysDifference > 0 ? daysDifference : 1;
            const averageDailyConsumption = data.totalConsumed / daysAnalyzed;

            return {
                fourage_stock_id: fourageStockId,
                average_daily_consumption: parseFloat(averageDailyConsumption.toFixed(2)),
                total_consumed: parseFloat(data.totalConsumed.toFixed(2)),
                days_analyzed: daysAnalyzed,
                record_count: data.recordCount,
                has_data: true
            };
        } catch (error) {
            throw new Error(`Error calculating consumption by stock: ${error.message}`);
        }
    }

    /**
     * Determine alert level based on days remaining
     * @param {Number} daysRemaining - Days until stock rupture
     * @returns {String} Alert level: 'critical', 'warning', or 'normal'
     */
    determineAlertLevel(daysRemaining) {
        if (daysRemaining < 3) return 'critical';
        if (daysRemaining < 7) return 'warning';
        return 'normal';
    }

    /**
     * Calculate suggested order quantity for critical stocks
     * Suggests enough stock for 14 days
     * @param {Number} averageDailyConsumption - Average daily consumption
     * @param {Number} currentQuantity - Current stock quantity
     * @returns {Number} Suggested order quantity
     */
    calculateSuggestedOrderQuantity(averageDailyConsumption, currentQuantity) {
        if (averageDailyConsumption === 0) return 0;
        
        // Suggest enough for 14 days
        const targetQuantity = averageDailyConsumption * 14;
        const suggestedOrder = targetQuantity - currentQuantity;
        
        return suggestedOrder > 0 ? parseFloat(suggestedOrder.toFixed(2)) : 0;
    }

    /**
     * Get comprehensive predictions for all forage stocks
     * Main endpoint for stock prediction dashboard
     * @returns {Array} Array of prediction objects for each stock
     */
    async getAllStockPredictions() {
        try {
            // Get all forage stocks
            const stocks = await FourageStock.find()
                .populate('fourage_id')
                .populate('supplier_id');

            // Calculate predictions for each stock
            const predictions = await Promise.all(
                stocks.map(async (stock) => {
                    // Get consumption data for this stock
                    const consumptionData = await this.calculateConsumptionByFourageStock(stock._id);

                    // Calculate days remaining (prevent division by zero)
                    let daysRemaining = null;
                    if (consumptionData.average_daily_consumption > 0) {
                        daysRemaining = parseFloat(
                            (stock.quantity / consumptionData.average_daily_consumption).toFixed(2)
                        );
                    }

                    // Determine alert level
                    const alertLevel = daysRemaining !== null 
                        ? this.determineAlertLevel(daysRemaining)
                        : 'unknown';

                    // Calculate suggested order quantity if critical
                    let suggestedOrderQuantity = 0;
                    if (alertLevel === 'critical' && consumptionData.average_daily_consumption > 0) {
                        suggestedOrderQuantity = this.calculateSuggestedOrderQuantity(
                            consumptionData.average_daily_consumption,
                            stock.quantity
                        );
                    }

                    return {
                        stock_id: stock._id,
                        stock_name: stock.name,
                        fourage_name: stock.fourage_id?.name || 'Unknown',
                        supplier_name: stock.supplier_id?.name || 'Unknown',
                        current_quantity: stock.quantity,
                        alert_threshold: stock.alert_threshold,
                        average_daily_consumption: consumptionData.average_daily_consumption,
                        total_consumed: consumptionData.total_consumed,
                        days_analyzed: consumptionData.days_analyzed,
                        days_remaining: daysRemaining,
                        alert_level: alertLevel,
                        suggested_order_quantity: suggestedOrderQuantity,
                        has_feeding_data: consumptionData.has_data
                    };
                })
            );

            // Sort by alert level priority (critical first, then warning, then normal)
            const alertPriority = { critical: 0, warning: 1, normal: 2, unknown: 3 };
            predictions.sort((a, b) => alertPriority[a.alert_level] - alertPriority[b.alert_level]);

            return predictions;
        } catch (error) {
            throw new Error(`Error generating stock predictions: ${error.message}`);
        }
    }

    /**
     * Get prediction for a specific forage stock
     * @param {String} stockId - The FourageStock ID
     * @returns {Object} Prediction object for the specified stock
     */
    async getStockPredictionById(stockId) {
        try {
            // Get the stock
            const stock = await FourageStock.findById(stockId)
                .populate('fourage_id')
                .populate('supplier_id');

            if (!stock) {
                throw new Error('Forage stock not found');
            }

            // Get consumption data
            const consumptionData = await this.calculateConsumptionByFourageStock(stockId);

            // Calculate days remaining
            let daysRemaining = null;
            if (consumptionData.average_daily_consumption > 0) {
                daysRemaining = parseFloat(
                    (stock.quantity / consumptionData.average_daily_consumption).toFixed(2)
                );
            }

            // Determine alert level
            const alertLevel = daysRemaining !== null 
                ? this.determineAlertLevel(daysRemaining)
                : 'unknown';

            // Calculate suggested order quantity if needed
            let suggestedOrderQuantity = 0;
            if (alertLevel === 'critical' && consumptionData.average_daily_consumption > 0) {
                suggestedOrderQuantity = this.calculateSuggestedOrderQuantity(
                    consumptionData.average_daily_consumption,
                    stock.quantity
                );
            }

            return {
                stock_id: stock._id,
                stock_name: stock.name,
                fourage_name: stock.fourage_id?.name || 'Unknown',
                supplier_name: stock.supplier_id?.name || 'Unknown',
                current_quantity: stock.quantity,
                alert_threshold: stock.alert_threshold,
                average_daily_consumption: consumptionData.average_daily_consumption,
                total_consumed: consumptionData.total_consumed,
                days_analyzed: consumptionData.days_analyzed,
                days_remaining: daysRemaining,
                alert_level: alertLevel,
                suggested_order_quantity: suggestedOrderQuantity,
                has_feeding_data: consumptionData.has_data
            };
        } catch (error) {
            throw new Error(`Error generating stock prediction: ${error.message}`);
        }
    }

    /**
     * Get consumption statistics by subgroup
     * Useful for analyzing which subgroups consume the most
     * @returns {Array} Array of subgroup consumption statistics
     */
    async getConsumptionBySubgroup() {
        try {
            const subgroups = await SubAnimalGroup.find().populate('groupAnimal_id');

            const statistics = await Promise.all(
                subgroups.map(async (subgroup) => {
                    const consumptionData = await this.calculateAverageDailyConsumption(subgroup._id);
                    
                    return {
                        subgroup_id: subgroup._id,
                        subgroup_name: subgroup.name,
                        subgroup_type: subgroup.type,
                        animal_count: subgroup.quantity,
                        group_name: subgroup.groupAnimal_id?.name || 'Unknown',
                        average_daily_consumption: consumptionData.average_daily_consumption,
                        total_consumed: consumptionData.total_consumed,
                        days_analyzed: consumptionData.days_analyzed,
                        consumption_per_animal: consumptionData.average_daily_consumption > 0
                            ? parseFloat((consumptionData.average_daily_consumption / subgroup.quantity).toFixed(2))
                            : 0,
                        has_feeding_data: consumptionData.has_data
                    };
                })
            );

            // Sort by total consumption (descending)
            statistics.sort((a, b) => b.total_consumed - a.total_consumed);

            return statistics;
        } catch (error) {
            throw new Error(`Error generating consumption statistics: ${error.message}`);
        }
    }

    /**
     * Get dashboard summary with key metrics
     * @returns {Object} Summary statistics for dashboard
     */
    async getDashboardSummary() {
        try {
            const predictions = await this.getAllStockPredictions();

            // Count stocks by alert level
            const criticalCount = predictions.filter(p => p.alert_level === 'critical').length;
            const warningCount = predictions.filter(p => p.alert_level === 'warning').length;
            const normalCount = predictions.filter(p => p.alert_level === 'normal').length;

            // Calculate total suggested orders
            const totalSuggestedOrders = predictions.reduce(
                (sum, p) => sum + p.suggested_order_quantity, 
                0
            );

            // Find stock with lowest days remaining
            const stocksWithDays = predictions.filter(p => p.days_remaining !== null);
            const lowestDaysStock = stocksWithDays.length > 0
                ? stocksWithDays.reduce((min, p) => p.days_remaining < min.days_remaining ? p : min)
                : null;

            return {
                total_stocks: predictions.length,
                critical_stocks: criticalCount,
                warning_stocks: warningCount,
                normal_stocks: normalCount,
                total_suggested_orders: parseFloat(totalSuggestedOrders.toFixed(2)),
                lowest_days_stock: lowestDaysStock
                    ? {
                        name: lowestDaysStock.stock_name,
                        days_remaining: lowestDaysStock.days_remaining
                    }
                    : null,
                stocks_without_data: predictions.filter(p => !p.has_feeding_data).length
            };
        } catch (error) {
            throw new Error(`Error generating dashboard summary: ${error.message}`);
        }
    }
}

module.exports = new PredictionService();
