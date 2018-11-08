var express = require('express');
var router = express.Router();
var controllerFood = require('../controllers/food');

router.get('/', controllerFood.getFoodList);
router.get('/food/delete/:id', controllerFood.food_delete);
router.get('/create-edit', controllerFood.food_create);
router.get('/create-edit/:id', controllerFood.edit_food);
router.post('/create-edit', controllerFood.create_item);
router.post('/create-edit/:id', controllerFood.food_put);

module.exports = router;
