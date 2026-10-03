const AnimalGroup = require('../models/animalGroup.model');

class AnimalGroupRepository {
    
    findAll() {
        return AnimalGroup.find();
    }

    findById(id) {
        return AnimalGroup.findById(id);
    }

    findByName(animalGroupName) {
        return AnimalGroup.find({
            name: {
                $regex: animalGroupName, $options: "i"
            }
        });
    }

    create(animalGroup){
        return AnimalGroup.create(animalGroup);
    }

    update(id, updatedAnimalGroup) {
        return AnimalGroup.findByIdAndUpdate(
            id,
            updatedAnimalGroup,
            {
                new: true, runValidators: true
            }
        );
    }

    delete(id) {
        return AnimalGroup.findByIdAndDelete(id);
    }

    async countGroups() {
        return await AnimalGroup.countDocuments();
    }
}

module.exports = new AnimalGroupRepository();