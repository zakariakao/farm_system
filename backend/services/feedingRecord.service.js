const repository = require('../repositories/feedingRecord.repository');
const fourageStockRepository = require('../repositories/fourageStock.repository');

class FeedingRecordService {

    async getAllFeedingRecords() {
        return await repository.findAll();
    }

    async getFeedingRecordById(id) {
        const record = await repository.findById(id);
        if (!record) throw new Error('Feeding record not found');
        return record;
    }

    async getFeedingRecordsBySubgroupId(subgroupId) {
        return await repository.findBySubgroupId(subgroupId);
    }

    async getFeedingRecordsByFourageStockId(fourageStockId) {
        return await repository.findByFourageStockId(fourageStockId);
    }

    async getFeedingRecordsByDateRange(startDate, endDate) {
        return await repository.findByDateRange(startDate, endDate);
    }

    async createFeedingRecord(feedingRecord) {
        // 1. Get the fourage stock
        const stock = await fourageStockRepository.findById(feedingRecord.fourage_stock_id);
        
        if (!stock) {
            throw new Error('Fourage stock not found');
        }

        // 2. Check if enough stock exists
        if (stock.quantity < feedingRecord.quantity) {
            throw new Error(`Insufficient stock. Available: ${stock.quantity}, Requested: ${feedingRecord.quantity}`);
        }

        // 3. Create the feeding record
        const record = await repository.create(feedingRecord);

        // 4. Reduce the stock quantity
        const newQuantity = stock.quantity - feedingRecord.quantity;
        await fourageStockRepository.update(feedingRecord.fourage_stock_id, {
            quantity: newQuantity,
            updated_at: new Date()
        });

        // 5. Check if stock is below threshold and add alert
        let alert = null;
        if (newQuantity < stock.alert_threshold) {
            alert = {
                message: `⚠️ Low stock alert: ${stock.fourage_id?.name || 'Fourage'} stock is below threshold`,
                currentQuantity: newQuantity,
                threshold: stock.alert_threshold,
                stockId: stock._id
            };
        }

        // 6. Return record with alert if applicable
        return {
            record,
            alert
        };
    }

    async updateFeedingRecord(id, feedingRecord) {
        return await repository.update(id, feedingRecord);
    }

    async deleteFeedingRecord(id) {
        return await repository.delete(id);
    }
}

module.exports = new FeedingRecordService();
