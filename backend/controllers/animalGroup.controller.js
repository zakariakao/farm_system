const service = require('../services/animalGroup.service');

class AnimalGroupController {
    async getAll(req, res, next) {
        try {
            const animalGroups = await service.getAllAnimalGroups();
            res.json({
                success: true,
                data: animalGroups
            });
        } catch(err) {
            next(err);
        }
    }

    async searchByName(req, res, next) {
        try {
            const {name} = req.query;
            const animalGroups = await service.searchByAnimalGroupName(name || '');
            res.json({
                success: true,
                data: animalGroups
            });
        } catch(err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const group = await service.getAnimalGroupById(req.params.id);
            res.json({
                success: true,
                data: group
            });
        } catch(err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const animalGroup = await service.createAnimalGroup(req.body);
            res.status(201).json({
                success: true,
                data: animalGroup
            });
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const animalGroup = await service.updateAnimalGroup(req.params.id, req.body);
            res.json({
                success: true,
                data: animalGroup
            });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const animalGroup = await service.deleteAnimalGroup(req.params.id);
            res.json({
                success: true,
                data: animalGroup
            });
        } catch(err) {
            next(err);
        }
    }
    async getGroupCount(req, res, next) {
        try {
            const count = await service.getGroupCount();
            res.json({
                success: true,
                data: count
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AnimalGroupController()