const service = require('../services/supplier.service');

class SupplierController {
    async getAll(req, res, next) {
        try {
            const suppliers = await service.getAllSuppliers();
            res.json({
                success: true,
                data: suppliers
            });
        } catch(err) {
            next(err);
        }
    }

    async searchByName(req, res, next) {
        try {
            const {name} = req.query;
            const suppliers = await service.searchBySupplierName(name || '');
            res.json({
                success: true,
                data: suppliers
            });
        } catch(err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const supplier = await service.getSupplierById(req.params.id);
            res.json({
                success: true,
                data: supplier
            });
        } catch(err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const supplier = await service.createSupplier(req.body);
            res.status(201).json({
                success: true,
                data: supplier
            });
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const supplier = await service.updateSupplier(req.params.id, req.body);
            res.json({
                success: true,
                data: supplier
            });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const supplier = await service.deleteSupplier(req.params.id);
            res.json({
                success: true,
                data: supplier
            });
        } catch(err) {
            next(err);
        }
    }

    async getTotalSuppliers(req, res , next) {
        try {
            const total = await service.getTotalSuppliers();
            res.json({
                success: true,
                data: total
            });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new SupplierController();
