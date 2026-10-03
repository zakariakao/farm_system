const express = require('express');
const controller = require('../controllers/subAnimalGroup.controller')

const router = express.Router();

router.get('/', controller.getAll);
router.get('/search', controller.searchByName);
router.get('/totalAnimals', controller.getTotalAnimals);
router.get('/totalSubGroups', controller.getSubGroupCount);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;