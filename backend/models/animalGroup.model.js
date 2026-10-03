const mongoose = require('mongoose');

const animalGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

animalGroupSchema.virtual('id').get(function() {
    return this._id.toString();
});

module.exports = mongoose.model("AnimalGroup", animalGroupSchema, "animalGroup");