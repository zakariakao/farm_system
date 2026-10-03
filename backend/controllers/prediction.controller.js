const service = require('../services/prediction.service');

/**
 * Prediction Controller
 * Handles HTTP requests for stock prediction and consumption analysis
 */
class PredictionController {

    /**
     * GET /api/predictions
     * Get predictions for all forage stocks
     * Main endpoint for the prediction dashboard
     */
    async getAllPredictions(req, res, next) {
        try {
            const predictions = await service.getAllStockPredictions();
            res.json({
                success: true,
                data: predictions,
                count: predictions.length
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * GET /api/predictions/stock/:stockId
     * Get prediction for a specific forage stock
     */
    async getPredictionByStockId(req, res, next) {
        try {
            const prediction = await service.getStockPredictionById(req.params.stockId);
            res.json({
                success: true,
                data: prediction
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * GET /api/predictions/consumption/subgroups
     * Get consumption statistics by subgroup
     * Useful for analyzing which animal subgroups consume the most
     */
    async getConsumptionBySubgroup(req, res, next) {
        try {
            const statistics = await service.getConsumptionBySubgroup();
            res.json({
                success: true,
                data: statistics,
                count: statistics.length
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * GET /api/predictions/consumption/subgroup/:subgroupId
     * Calculate average daily consumption for a specific subgroup
     */
    async getSubgroupConsumption(req, res, next) {
        try {
            const consumption = await service.calculateAverageDailyConsumption(req.params.subgroupId);
            res.json({
                success: true,
                data: consumption
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * GET /api/predictions/consumption/stock/:stockId
     * Calculate consumption statistics for a specific forage stock
     */
    async getStockConsumption(req, res, next) {
        try {
            const consumption = await service.calculateConsumptionByFourageStock(req.params.stockId);
            res.json({
                success: true,
                data: consumption
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * GET /api/predictions/dashboard/summary
     * Get dashboard summary with key metrics
     * Returns overview statistics for the main dashboard
     */
    async getDashboardSummary(req, res, next) {
        try {
            const summary = await service.getDashboardSummary();
            res.json({
                success: true,
                data: summary
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * GET /api/predictions/alerts
     * Get only stocks with critical or warning alerts
     * Filtered view for urgent attention
     */
    async getAlerts(req, res, next) {
        try {
            const allPredictions = await service.getAllStockPredictions();
            const alerts = allPredictions.filter(
                p => p.alert_level === 'critical' || p.alert_level === 'warning'
            );
            res.json({
                success: true,
                data: alerts,
                count: alerts.length
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * GET /api/predictions/critical
     * Get only stocks with critical alert level
     * Highest priority stocks requiring immediate attention
     */
    async getCriticalStocks(req, res, next) {
        try {
            const allPredictions = await service.getAllStockPredictions();
            const critical = allPredictions.filter(p => p.alert_level === 'critical');
            res.json({
                success: true,
                data: critical,
                count: critical.length
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new PredictionController();
