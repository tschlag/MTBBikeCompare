const {Router} = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

//get request fetches all items from the server
router.get('/items', itemController.get_items);
//post request is to add a new item to the database
router.post('/items', itemController.post_item);

//the 'id' in the two below contains the id of the item 
//and is used to search in the database

//put request updates an existing item in the database
router.put('/items/:id', itemController.update_item);
//delete request deletes an item from the database
router.delete('/items/:id', itemController.delete_item);

module.exports = router;