const service = require('../services/user.service');

class UserController {
    async register(req, res, next) {
        try {
            const result = await service.register(req.body);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result
            });
        } catch(err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const result = await service.login(email, password);
            res.json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch(err) {
            next(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await service.getAllUsers();
            res.json({
                success: true,
                data: users
            });
        } catch(err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await service.getUserById(req.params.id);
            res.json({
                success: true,
                data: user
            });
        } catch(err) {
            next(err);
        }
    }

    async createUser(req, res) {
        try {
            const user = await service.createUser(req.body);
            res.status(201).json({ success: true, message: 'User created', data: user });
        } catch(err) {
            console.error(err);
            if (err.name === 'ValidationError') {
                const errors = Object.values(err.errors).map(e => e.message);
                return res.status(400).json({
                    success: false,
                    message: 'Validation Error',
                    errors: errors
                });
            }
            if (err.code === 11000) {
                const field = Object.keys(err.keyPattern || err.keyValue || {})[0] || 'Field';
                return res.status(400).json({
                    success: false,
                    message: `${field} already exists`
                });
            }
            res.status(500).json({
                success: false,
                message: err.message || 'Internal server error'
            });
        }
    }


    async update(req, res, next) {
        try {
            const user = await service.updateUser(req.params.id, req.body);
            res.json({
                success: true,
                data: user
            });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const user = await service.deleteUser(req.params.id);
            res.json({
                success: true,
                data: user
            });
        } catch(err) {
            next(err);
        }
    }
    async getWorkerCount(req, res, next) {
        try {
            const count = await service.getWorkerCount();
            res.json({
                success: true,
                data: count
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();
