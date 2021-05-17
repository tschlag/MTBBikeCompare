const {Router} = require('express');
const cartController = require('../controllers/cartControllers');
const router = Router();

//fetches all items in a cart for a user
router.get('/cart/:id', cartController.get_cart_items);
//adds an item and identifies the user
router.post('/cart/:id', cartController.add_cart_item);
//deletes an item, uses userId and itemId to delete the correct item
router.delete('/cart/:userId/:itemId', cartController.delete_item);

module.exports = router;