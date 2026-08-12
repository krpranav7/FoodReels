const foodModel = require("../models/food.model");
const foodPartnerModel = require("../models/foodpartner.model");

async function getFoodPartnerById(req, res){
    try {
        const foodPartnerId = req.params.id;
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);

        if(!foodPartner){
            return res.status(404).json({
                message: "Food partner not found"
            });
        }

        const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId})

        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                _id: foodPartner._id,
                businessName: foodPartner.businessName,
                address: foodPartner.address,
                foodItems: foodItemsByFoodPartner
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getFoodPartnerById
}