var express = require('express');
var router = express.Router();
var controllerFood = require('../controllers/food');
// API Routes
router.get('/food', controllerFood.get_food);
router.get('/food/:id', controllerFood.foodById);
router.post('/food', controllerFood.post_food);
router.delete('/food/:id', controllerFood.foodDelete);
router.put('/food/:id', controllerFood.put_food);

module.exports = router;