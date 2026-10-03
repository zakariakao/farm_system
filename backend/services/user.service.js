const repository = require('../repositories/user.repository');
const jwt = require('jsonwebtoken');

class UserService {

    async getAllUsers() {
        return await repository.findAll();
    }

    async getUserById(id) {
        const user = await repository.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }

    async createUser(userData) {
        // Check if email already exists
        const existingEmail = await repository.findByEmail(userData.email);
        if (existingEmail) {
            const err = new Error('Email already registered');
            err.status = 400;
            throw err;
        }

        // Check if username already exists
        const existingUsername = await repository.findByUsername(userData.username);
        if (existingUsername) {
            const err = new Error('Username already taken');
            err.status = 400;
            throw err;
        }

        const user = await repository.create(userData);
        return user;
    }

    async register(userData) {
        // Check if email already exists
        const existingEmail = await repository.findByEmail(userData.email);
        if (existingEmail) {
            throw new Error('Email already registered');
        }

        // Check if username already exists
        const existingUsername = await repository.findByUsername(userData.username);
        if (existingUsername) {
            throw new Error('Username already taken');
        }

        // Create user (password will be hashed by model middleware)
        const user = await repository.create(userData);

        // Generate JWT token
        const token = this.generateToken(user);

        return {
            user,
            token
        };
    }

    async login(email, password) {
        // Find user with password included
        const user = await repository.findByEmailWithPassword(email);
        
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Compare passwords using the model method
        const isPasswordValid = await user.comparePassword(password);
        
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = this.generateToken(user);

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        return {
            user: userResponse,
            token
        };
    }

    generateToken(user) {
        return jwt.sign(
            { 
                id: user._id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN || '1d' 
            }
        );
    }

    async updateUser(id, userData) {
        // Don't allow password update through this method
        if (userData.password) {
            throw new Error('Use change password endpoint to update password');
        }

        return await repository.update(id, userData);
    }

    async deleteUser(id) {
        return await repository.delete(id);
    }

    async getWorkerCount() {
        return await repository.countWorkers();
    }
}

module.exports = new UserService();
