const {Router} = require('express');
const orderController = require('../controllers/orderControllers');
const router = Router();

//fetches all orders that the user has made
router.get('/order/:id', orderController.get_orders);
//creates new order for the user
router.post('/order/:id', orderController.checkout);

module.exports = router;