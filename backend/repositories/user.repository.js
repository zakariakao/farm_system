const User = require('../models/user.model');

class UserRepository {
    
    findAll() {
        return User.find().select('-password');
    }

    findById(id) {
        return User.findById(id).select('-password');
    }

    findByEmail(email) {
        return User.findOne({ email });
    }

    findByUsername(username) {
        return User.findOne({ username });
    }

    findByEmailWithPassword(email) {
        return User.findOne({ email }).select('+password');
    }

    create(user) {
        return User.create(user);
    }

    update(id, updatedUser) {
        return User.findByIdAndUpdate(
            id,
            updatedUser,
            {
                new: true, runValidators: true
            }
        ).select('-password');
    }

    delete(id) {
        return User.findByIdAndDelete(id);
    }

    async countWorkers() {
        // Assumes 'role' field is 'worker' for workers
        return await User.countDocuments({ role: 'worker' });
    }
}

module.exports = new UserRepository();
