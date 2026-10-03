const express = require('express');
const controller = require('../controllers/prediction.controller');

const router = express.Router();

/**
 * Prediction Routes
 * RESTful API endpoints for stock prediction and consumption analysis
 */

// Dashboard summary - most important metrics
router.get('/dashboard/summary', controller.getDashboardSummary);

// Alert endpoints - filtered views
router.get('/alerts', controller.getAlerts);
router.get('/critical', controller.getCriticalStocks);

// Consumption analysis endpoints
router.get('/consumption/subgroups', controller.getConsumptionBySubgroup);
router.get('/consumption/subgroup/:subgroupId', controller.getSubgroupConsumption);
router.get('/consumption/stock/:stockId', controller.getStockConsumption);

// Main prediction endpoints
router.get('/stock/:stockId', controller.getPredictionByStockId);
router.get('/', controller.getAllPredictions);

module.exports = router;
