const FourageStock = require('../models/fourageStock.model');
const Fourage = require('../models/fourage.model');

class FourageStockRepository {
    
    findAll() {
        return FourageStock.find()
            .populate('fourage_id')
            .populate('supplier_id');
    }

    findById(id) {
        return FourageStock.findById(id)
            .populate('fourage_id')
            .populate('supplier_id');
    }

    async findByName(name) {
        const fourages = await Fourage.find({
            name: {
                $regex: name, $options: "i"
            }
        });
        const fourageIds = fourages.map(f => f._id);
        return FourageStock.find({ fourage_id: { $in: fourageIds } })
            .populate('fourage_id')
            .populate('supplier_id');
    }

    findByFourageId(fourageId) {
        return FourageStock.find({ fourage_id: fourageId })
            .populate('fourage_id')
            .populate('supplier_id');
    }

    findBySupplierId(supplierId) {
        return FourageStock.find({ supplier_id: supplierId })
            .populate('fourage_id')
            .populate('supplier_id');
    }

    findLowStock() {
        return FourageStock.find({
            $expr: { $lt: ['$quantity', '$alert_threshold'] }
        })
            .populate('fourage_id')
            .populate('supplier_id');
    }

    create(fourageStock) {
        return FourageStock.create(fourageStock);
    }

    update(id, updatedFourageStock) {
        return FourageStock.findByIdAndUpdate(
            id,
            updatedFourageStock,
            {
                new: true, runValidators: true
            }
        );
    }

    delete(id) {
        return FourageStock.findByIdAndDelete(id);
    }
}

module.exports = new FourageStockRepository();
