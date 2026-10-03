const express = require('express');
const controller = require('../controllers/animalGroup.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/search', controller.searchByName);
router.get('/totalGroups', controller.getGroupCount);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;