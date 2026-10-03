const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

supplierSchema.virtual('id').get(function() {
    return this._id.toString();
});

module.exports = mongoose.model("Supplier", supplierSchema, "supplier");