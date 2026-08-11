const express = require('express');
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require('../middlewares/auth.middleware');

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
});

// express server can't directly read any file coming from frontend(for now postman request) by default, so use MULTER package
// "video" is that key from frontend(for now postman post request)
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood); /* /api/food/ */
router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems);
router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFood);
router.post('/save', authMiddleware.authUserMiddleware, foodController.saveFood);
router.get('/save', authMiddleware.authUserMiddleware, foodController.getSavedFood);

module.exports = router;