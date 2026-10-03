const mongoose = require('mongoose');

const subAnimalGroupSchema = new mongoose.Schema({
    groupAnimal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AnimalGroup",
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field to map _id to id
subAnimalGroupSchema.virtual('id').get(function() {
    return this._id.toString();
});

module.exports = mongoose.model("SubAnimalGroup", subAnimalGroupSchema, "subAnimalGroup");
