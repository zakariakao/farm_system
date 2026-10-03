const mongoose = require('mongoose');

const FourageStockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fourage_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fourage',
        required: true
    },
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    alert_threshold: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

FourageStockSchema.virtual('id').get(function() {
    return this._id.toString();
});

module.exports = mongoose.model('FourageStock', FourageStockSchema, 'fourageStock');