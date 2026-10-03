const repository = require('../repositories/subAnimalGroup.repository');

class SubGroupAnimalService {

    async getAllSubAnimalGroups() {
            return await repository.findAll();
        }
    
        async searchBySubAnimalGroupName(animalGroupName) {
            return await repository.findByName(animalGroupName);
        }
    
        async getSubAnimalGroupById(id) {
            const group =  await repository.findById(id);
            if (!group) throw new Error('Animal Group not found');
            return group;
        }
    
        async createSubAnimalGroup(animalGroup) {
            return await repository.create(animalGroup);
        }
    
        async updateSubAnimalGroup(id, animalGroup) {
            return await repository.update(id, animalGroup);
        }
    
        async deleteSubAnimalGroup(id) {
            return await repository.delete(id);
        }

        async getTotalAnimals() {
            return await repository.getTotalAnimals();
        }

        async getSubGroupCount() {
            return await repository.countSubGroups();
        }
}

module.exports = new SubGroupAnimalService();