const repository = require('../repositories/supplier.repository');

class SupplierService {
    async getAllSuppliers() {
        return await repository.findAll();
    }

    async searchBySupplierName(supplierName) {
        return await repository.findByName(supplierName);
    }

    async getSupplierById(id) {
        const supplier = await repository.findById(id);
        if (!supplier) throw new Error('Supplier not found');
        return supplier;
    }

    async createSupplier(supplier) {
        return await repository.create(supplier);
    }

    async updateSupplier(id, supplier) {
        return await repository.update(id, supplier);
    }

    async deleteSupplier(id) {
        return await repository.delete(id);
    }

    async getTotalSuppliers() {
        return await repository.getTotalSuppliers();
    }
}

module.exports = new SupplierService();
