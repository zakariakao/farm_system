const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

// Authentication routes (public)
router.post('/register', controller.register);
router.post('/login', controller.login);

// User management routes (should be protected with auth middleware later)
router.get('/', controller.getAll);
router.post('/', controller.createUser);
router.get('/totalWorkers', controller.getWorkerCount);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
