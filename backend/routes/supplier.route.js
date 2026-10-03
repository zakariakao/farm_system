const express = require('express');
const controller = require('../controllers/supplier.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/search', controller.searchByName);
router.get('/totalSuppliers', controller.getTotalSuppliers);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
