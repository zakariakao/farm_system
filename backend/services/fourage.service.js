const repository = require('../repositories/fourage.repository');

class FourageService {

    async getAllFourages(){
        return await repository.findAll();
    }

    async getFourageById(id) {
        return await repository.findById(id);
    }

    async searchFourageByName(name) {
        return await repository.findByName(name);
    }

    async createFourage(fourage) {
        return await repository.create(fourage);
    }

    async updateFourage(id, fourage) {
        return await repository.update(id, fourage);
    }

    async deleteFourage(id) {
        return await repository.delete(id);
    }

    async getTotalFourgesCount() {
        return await repository.getTotalFourageCount();
    }
}

module.exports = new FourageService();