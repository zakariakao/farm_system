const repository = require('../repositories/fourageStock.repository');

class FourageStockService {

    async getAllFourageStocks() {
        return await repository.findAll();
    }

    async getFourageStockById(id) {
        const stock = await repository.findById(id);
        if (!stock) throw new Error('Fourage stock not found');
        return stock;
    }

    async searchFourageStockByName(name) {
        return await repository.findByName(name);
    }

    async getFourageStocksByFourageId(fourageId) {
        return await repository.findByFourageId(fourageId);
    }

    async getFourageStocksBySupplierId(supplierId) {
        return await repository.findBySupplierId(supplierId);
    }

    async getLowStockItems() {
        return await repository.findLowStock();
    }

    async createFourageStock(fourageStock) {
        return await repository.create(fourageStock);
    }

    async updateFourageStock(id, fourageStock) {
        return await repository.update(id, fourageStock);
    }

    async deleteFourageStock(id) {
        return await repository.delete(id);
    }
}

module.exports = new FourageStockService();
