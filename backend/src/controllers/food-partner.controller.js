const foodModel = require("../models/food.model");
const foodPartnerModel = require("../models/foodpartner.model");

async function getFoodPartnerById(req, res){
    const foodPartnerId = req.params.id;
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId})

    if(!foodPartner){
        return res.status(404).json({
            message: "Food partner not found"
        });
    }

    res.status(200).json({
        message: "Food partner retrieved successfully",
        // foodPartner:{
        //     ...foodPartner.toObject(),
        //     foodItems: foodItemsByFoodPartner
        // }
        foodPartner: {
            _id: foodPartner._id,
            businessName: foodPartner.businessName,
            address: foodPartner.address,
            foodItems: foodItemsByFoodPartner
        }
    });
}

module.exports = {
    getFoodPartnerById
}