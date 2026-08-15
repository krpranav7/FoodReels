const commentModel = require("../models/comment.model");
const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const savesModel = require("../models/saves.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Video required"
            })
        }
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        })

        res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        })
    }
    catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({});

        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        })
    }
    catch(err){
        console.error(err);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function likeFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        const food = await foodModel.findById(foodId);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        })

        if (isAlreadyLiked) {
            await likeModel.deleteOne({
                user: user._id,
                food: foodId
            })

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likesCount: -1 }
            })

            return res.status(200).json({
                message: "Food unliked successfully",
                like: false
            })
        }

        const like = await likeModel.create({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likesCount: 1 }
        })

        res.status(201).json({
            message: "Food like successfully",
            like: true
        })
    }
    catch (err) {
        if (err.code === 11000) {
            // duplicate like caused by a race condition (e.g. rapid double-click)
            return res.status(200).json({
                message: "Food already liked",
                like: true
            });
        }
 
        console.error(err);
 
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).json({
                message: "Food not found"
            });
        }

        const isAlreadySaved = await savesModel.findOne({
            user: user._id,
            food: foodId
        })

        if (isAlreadySaved) {
            await savesModel.deleteOne({
                user: user._id,
                food: foodId
            })

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { savesCount: -1 }
            })

            return res.status(200).json({
                message: "Food unsaved successfully",
                save: false
            })
        }

        const save = await savesModel.create({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: 1 }
        })

        res.status(201).json({
            message: "Food saved successfully",
            save: true
        })
    }
    catch (err) {
        if (err.code === 11000) {
            // duplicate save caused by a race condition (e.g. rapid double-click)
            return res.status(200).json({
                message: "Food already saved",
                save: true
            });
        }
 
        console.error(err);
 
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getSavedFood(req, res) {
    res.set("Cache-Control", "no-store")
    try {
        const user = req.user;
        const savedFoods = await savesModel.find({ user: user._id }).populate('food');

        if (savedFoods.length === 0) {
            return res.status(200).json({
                message: "No saved foods found",
                savedFoods: []
            })
        }
        res.status(200).json({
            message: "Saved foods retrieved successfully",
            savedFoods
        })
    }
    catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function addComment(req, res){
    try{
        const {foodId, text} = req.body;
        const user = req.user;

        if(!text?.trim()){
            return res.status(400).json({
                message: "Comment text is required"
            });
        }

        const food = await foodModel.findById(foodId);
        
        if(!food){
            return res.status(404).json({
                message:"Food not found"
            });
        }

        const comment = await commentModel.create({
            user: user._id,
            food: foodId,
            text: text.trim()
        });

        await foodModel.findByIdAndUpdate(foodId, {$inc: {commentsCount: 1}});

        res.status(201).json({
            message: "Comment added successfully",
            comment: {
                _id: comment._id,
                text: comment.text,
                createdAt: comment.createdAt,
                user: {
                    _id: user._id,
                    fullName: user.fullName
                }
            }
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getComments(req, res){
    try{
        const {foodId} = req.params;

        const comments = await commentModel.find({food: foodId})
                        .sort({createdAt: -1})
                        .populate('user', 'fullName'); // the second argument 'fullName' limits what gets pulled back to just that one field (plus _id automatically)
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFood,
    addComment,
    getComments
}