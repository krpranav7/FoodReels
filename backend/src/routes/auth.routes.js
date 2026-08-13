const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require('../middlewares/auth.middleware');

//user auth APIs
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);

//food partner APIs
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.get('/food-partner/logout', authController.logoutFoodPartner);

router.get(
    '/user/me',
    authMiddleware.authUserMiddleware,
    authController.getCurrentUser
);

router.post('/user/google', authController.googleLoginUser);

module.exports = router;