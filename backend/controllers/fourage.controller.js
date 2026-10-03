const service = require('../services/fourage.service');

class FourageController {
    async getAll(req, res, next) {
        try {
            const fourages = await service.getAllFourages();
            res.json({
                success: true,
                data: fourages
            });
        } catch(err) {
            next(err);
        }
    }

    async searchByName(req, res, next) {
        try {
            const {name} = req.query;
            const fourages = await service.searchFourageByName(name || '');
            res.json({
                success: true,
                data: fourages
            });
        } catch(err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const fourage = await service.getFourageById(req.params.id);
            res.json({
                success: true,
                data: fourage
            });
        } catch(err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const fourage = await service.createFourage(req.body);
            res.status(201).json({
                success: true,
                data: fourage
            });
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const fourage = await service.updateFourage(req.params.id, req.body);
            res.json({
                success: true,
                data: fourage
            });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const fourage = await service.deleteFourage(req.params.id);
            res.json({
                success: true,
                data: fourage
            });
        } catch(err) {
            next(err);
        }
    }

    async getTotaFouragesCount(req, res, next) {
        try{
            const total = await service.getTotalFourgesCount();
            res.json({
                success: true,
                data: total
            });
        } catch(err) {
            next(err);
        } 
    }
}

module.exports = new FourageController();
