const Supplier = require('../models/supplier.model');

class SupplierRepository {
    
    findAll() {
        return Supplier.find();
    }

    findById(id) {
        return Supplier.findById(id);
    }

    findByName(supplierName) {
        return Supplier.find({
            name: {
                $regex: supplierName, $options: "i"
            }
        });
    }

    create(supplier){
        return Supplier.create(supplier);
    }

    update(id, updatedSupplier) {
        return Supplier.findByIdAndUpdate(
            id,
            updatedSupplier,
            {
                new: true, runValidators: true
            }
        );
    }

    delete(id) {
        return Supplier.findByIdAndDelete(id);
    }

    // Returns the total number of suppliers
    getTotalSuppliers() {
        return Supplier.countDocuments();
    }
}

module.exports = new SupplierRepository();
