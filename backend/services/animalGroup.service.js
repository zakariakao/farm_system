const repository = require('../repositories/animalGroup.repository');

class AnimalGroupService {
    async getAllAnimalGroups() {
        return await repository.findAll();
    }

    async searchByAnimalGroupName(animalGroupName) {
        return await repository.findByName(animalGroupName);
    }

    async getAnimalGroupById(id) {
        const group =  await repository.findById(id);
        if (!group) throw new Error('Animal Group not found');
        return group;
    }

    async createAnimalGroup(animalGroup) {
        return await repository.create(animalGroup);
    }

    async updateAnimalGroup(id, animalGroup) {
        return await repository.update(id, animalGroup);
    }

    async deleteAnimalGroup(id) {
        return await repository.delete(id);
    }

    async getGroupCount() {
        return await repository.countGroups();
    }
}

module.exports = new AnimalGroupService();