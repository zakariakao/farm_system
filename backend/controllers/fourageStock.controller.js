const service = require('../services/fourageStock.service');

class FourageStockController {
    async getAll(req, res, next) {
        try {
            const stocks = await service.getAllFourageStocks();
            res.json({
                success: true,
                data: stocks
            });
        } catch(err) {
            next(err);
        }
    }

    async searchByName(req, res, next) {
        try {
            const {name} = req.query;
            const stocks = await service.searchFourageStockByName(name || '');
            res.json({
                success: true,
                data: stocks
            });
        } catch(err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const stock = await service.getFourageStockById(req.params.id);
            res.json({
                success: true,
                data: stock
            });
        } catch(err) {
            next(err);
        }
    }

    async getByFourageId(req, res, next) {
        try {
            const stocks = await service.getFourageStocksByFourageId(req.params.fourageId);
            res.json({
                success: true,
                data: stocks
            });
        } catch(err) {
            next(err);
        }
    }

    async getBySupplierId(req, res, next) {
        try {
            const stocks = await service.getFourageStocksBySupplierId(req.params.supplierId);
            res.json({
                success: true,
                data: stocks
            });
        } catch(err) {
            next(err);
        }
    }

    async getLowStock(req, res, next) {
        try {
            const stocks = await service.getLowStockItems();
            res.json({
                success: true,
                data: stocks
            });
        } catch(err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const stock = await service.createFourageStock(req.body);
            res.status(201).json({
                success: true,
                data: stock
            });
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const stock = await service.updateFourageStock(req.params.id, req.body);
            res.json({
                success: true,
                data: stock
            });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const stock = await service.deleteFourageStock(req.params.id);
            res.json({
                success: true,
                data: stock
            });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new FourageStockController();
