const Fourage = require('../models/fourage.model');

class FourageRepository {

    findAll() {
        return Fourage.find();
    }

    findById(id) {
            return Fourage.findById(id);

        }

    getTotalFourageCount() {
        return Fourage.countDocuments();
    }
    
    findByName(fourageName) {
            return Fourage.find({
                name: {
                    $regex: fourageName, $options: "i"
                }
            });
        }    
    
    create(fourage){
            return Fourage.create(fourage);
        }
    
    update(id, fourage) {
            return Fourage.findByIdAndUpdate(
                id,
                fourage,
                {
                    new: true, runValidators: true
                }
            );
        }
    
    delete(id) {
            return Fourage.findByIdAndDelete(id);
        }

        
}

module.exports = new FourageRepository();