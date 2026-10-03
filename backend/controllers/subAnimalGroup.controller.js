const service = require('../services/subAnimalGroup.service');

class SubAnimalGroupController {

    async getAll(req, res, next) {
        try {
            const subAnimalGroups = await service.getAllSubAnimalGroups();
            res.json({
                success: true,
                data: subAnimalGroups
            });
        } catch(err) {
            next(err);
        }
    }

    async searchByName(req, res, next) {
        try {
            const {name} = req.query
            const subAnimalGroup = await service.searchBySubAnimalGroupName(name || '');
            res.json({
                success: true,
                data: subAnimalGroup
            });
        } catch(err) {
            next(err);
        }
    }

    async getById(req, res, next){
        try {
            const subAnimalGroup = await service.getSubAnimalGroupById(req.params.id);
            res.json({
                success: true,
                data: subAnimalGroup
            });
        } catch(err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const subAnimalGroup = await service.createSubAnimalGroup(req.body);
            res.status(201).json({
                success: true,
                data: subAnimalGroup
            });
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const subAnimalGroup = await service.updateSubAnimalGroup(req.params.id, req.body);
        res.json({
                success: true,
                data: subAnimalGroup
            });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const subAnimalGroup = await service.deleteSubAnimalGroup(req.params.id);
            res.json({
                success: true,
                data: subAnimalGroup
            });
        } catch(err) {
            next(err);
        }
    }

    async getTotalAnimals(req, res, next) {
        try {
            const total = await service.getTotalAnimals();
            res.json({
                success: true,
                data: total
            });
        } catch(err) {
            next(err);
        }
    }

    async getSubGroupCount(req, res, next) {
        try {
            const count = await service.getSubGroupCount();
            res.json({
                success: true,
                data: count
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SubAnimalGroupController();