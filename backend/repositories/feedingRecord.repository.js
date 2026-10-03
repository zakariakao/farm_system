const FeedingRecord = require('../models/feedingRecord.model');

class FeedingRecordRepository {
    
    findAll() {
        return FeedingRecord.find()
            .populate('subgroup_id')
            .populate('fourage_stock_id');
    }

    findById(id) {
        return FeedingRecord.findById(id)
            .populate('subgroup_id')
            .populate('fourage_stock_id');
    }

    findBySubgroupId(subgroupId) {
        return FeedingRecord.find({ subgroup_id: subgroupId })
            .populate('subgroup_id')
            .populate('fourage_stock_id');
    }

    findByFourageStockId(fourageStockId) {
        return FeedingRecord.find({ fourage_stock_id: fourageStockId })
            .populate('subgroup_id')
            .populate('fourage_stock_id');
    }

    findByDateRange(startDate, endDate) {
        return FeedingRecord.find({
            datetime: {
                $gte: startDate,
                $lte: endDate
            }
        })
            .populate('subgroup_id')
            .populate('fourage_stock_id')
            .sort({ datetime: -1 });
    }

    create(feedingRecord) {
        return FeedingRecord.create(feedingRecord);
    }

    update(id, updatedFeedingRecord) {
        return FeedingRecord.findByIdAndUpdate(
            id,
            updatedFeedingRecord,
            {
                new: true, runValidators: true
            }
        );
    }

    delete(id) {
        return FeedingRecord.findByIdAndDelete(id);
    }
}

module.exports = new FeedingRecordRepository();
