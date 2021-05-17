//four functions for handling all logic related to the items
const Item = require('../models/Item');

//function that gets all items from the database
module.exports.get_items = (req, res) => {
    //gets all items and then sorts by date in decreasing order
    //return these items in json format
    Item.find().sort({date:-1}).then(items => res.json(items));
}

//add a new item to the cart
module.exports.post_item = (req, res) => {
    //use the request body as the input for the new item
    const newItem = new Item(req.body);
    //save the new item in the database and send the new item as the 
    //response in json format
    newItem.save().then(item => res.json(item));
}

//updating items
module.exports.update_item = (req, res) => {
    //search for the item and update with new information
    Item.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            //send the update item as the response
            res.json(item);
        });
    });
}

//delete items
module.exports.delete_item = (req, res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
}