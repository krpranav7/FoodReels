const express = require('express');
const router = express.Router();
const foodPartnerControler = require('../controllers/food-partner.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:id', foodPartnerControler.getFoodPartnerById);

module.exports = router;