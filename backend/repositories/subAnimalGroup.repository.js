const SubAnimalGroup = require('../models/subAnimalGroup.model');
require('../models/animalGroup.model');

class SubAnimalGroupRepository {

    findAll() {
        return SubAnimalGroup.find().populate('groupAnimal_id', 'name type');
    }

    findById(id) {
        return SubAnimalGroup.findById(id).populate('groupAnimal_id', 'name type');
    }

    searchByName(subAnimalGroupName){
        return SubAnimalGroup.find({
            name: {
                $regex: subAnimalGroupName, $options: "i"
            }
        });
    }

    create(subAnimalGroup) {
        return SubAnimalGroup.create(subAnimalGroup);
    }

    update(id, subAnimalGroup) {
        return SubAnimalGroup.findByIdAndUpdate(
            id, 
            subAnimalGroup,
            {
               new: true, runValidators: true
            }
        );
    }

    delete(id) {
        return SubAnimalGroup.findByIdAndDelete(id);
    }

    
    getTotalAnimals() {
        return SubAnimalGroup.aggregate([
            { $group: { _id: null, total: { $sum: "$quantity" } } }
        ]).then(result => (result[0] ? result[0].total : 0));
    }

    async countSubGroups() {
        return await SubAnimalGroup.countDocuments();
    }
}

module.exports = new SubAnimalGroupRepository();