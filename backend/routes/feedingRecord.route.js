const express = require('express');
const controller = require('../controllers/feedingRecord.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/date-range', controller.getByDateRange);
router.get('/subgroup/:subgroupId', controller.getBySubgroupId);
router.get('/fourage-stock/:fourageStockId', controller.getByFourageStockId);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
