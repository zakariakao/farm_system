const mongoose = require('mongoose');

const FeedingRecordSchema = new mongoose.Schema({
    subgroup_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubAnimalGroup',
        required: true
    },
    fourage_stock_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FourageStock',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    datetime: {
       type: Date,
       default: Date.now,
       required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

FeedingRecordSchema.virtual('id').get(function() {
    return this._id.toString();
});

module.exports = mongoose.model('FeedingRecord', FeedingRecordSchema, 'feedingRecord');