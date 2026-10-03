const service = require('../services/feedingRecord.service');

class FeedingRecordController {
    async getAll(req, res, next) {
        try {
            const records = await service.getAllFeedingRecords();
            res.json({
                success: true,
                data: records
            });
        } catch(err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const record = await service.getFeedingRecordById(req.params.id);
            res.json({
                success: true,
                data: record
            });
        } catch(err) {
            next(err);
        }
    }

    async getBySubgroupId(req, res, next) {
        try {
            const records = await service.getFeedingRecordsBySubgroupId(req.params.subgroupId);
            res.json({
                success: true,
                data: records
            });
        } catch(err) {
            next(err);
        }
    }

    async getByFourageStockId(req, res, next) {
        try {
            const records = await service.getFeedingRecordsByFourageStockId(req.params.fourageStockId);
            res.json({
                success: true,
                data: records
            });
        } catch(err) {
            next(err);
        }
    }

    async getByDateRange(req, res, next) {
        try {
            const { startDate, endDate } = req.query;
            const records = await service.getFeedingRecordsByDateRange(
                new Date(startDate),
                new Date(endDate)
            );
            res.json({
                success: true,
                data: records
            });
        } catch(err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const record = await service.createFeedingRecord(req.body);
            res.status(201).json({
                success: true,
                data: record
            });
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const record = await service.updateFeedingRecord(req.params.id, req.body);
            res.json({
                success: true,
                data: record
            });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const record = await service.deleteFeedingRecord(req.params.id);
            res.json({
                success: true,
                data: record
            });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new FeedingRecordController();
