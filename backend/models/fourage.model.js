const mongoose = require('mongoose');

const fourageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['hay', 'silage', 'grass', 'grain', 'supplement', 'other']
    },
    suitableFor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubAnimalGroup'
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

fourageSchema.virtual('id').get(function() {
    return this._id.toString();
});

module.exports = mongoose.model("Fourage", fourageSchema, "fourage");