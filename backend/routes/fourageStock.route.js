const express = require('express');
const controller = require('../controllers/fourageStock.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/search', controller.searchByName);
router.get('/low-stock', controller.getLowStock);
router.get('/fourage/:fourageId', controller.getByFourageId);
router.get('/supplier/:supplierId', controller.getBySupplierId);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
