const Cart = require('../models/Cart');
const Item = require('../models/Item');

//gets the users cart from the db and informs them if it's empty
//or what's in their cart
module.exports.get_cart_items = async (req, res) => {
    const userId = req.params.id;
    try {
        let cart = await Cart.findOne({userId});
        if (cart && cart.items.length > 0) {
            res.send(cart);
        }
        else {
            res.send(null);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
    }
}

//func to add a new cart item
module.exports.add_cart_item = async (req,res) => {
    const userId = req.params.id;
    const {productId, quantity} = req.body;

    try {
        let cart = await Cart.findOne({userId});
        let item = await Item.findOne({_id: productId});
        if (!item) {
            res.status(404).send('Item not found!');
        }
        const price = item.price;
        const name = item.title;
        
        //if cart exists for the user
        if (cart) {
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            //check if product exists or not
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                cart.items.push({productId, name, quantity, price});
            }

            cart.bill += quantity * price;
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            //when no cart exists, we must create a new one
            const newCart = await Cart.create({
                userId,
                items: [{productId, name, quantity, price}],
                bill: quantity * price
            });
            return res.status(201).send(newCart);
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong.');
    }
}

//func to delete a cart item
module.exports.delete_item = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;

    try {
        let cart = await Cart.findOne({userId});
        let itemIndex = cart.items.findIndex(p => p.productId == productId);

        if (itemIndex > -1) {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity * productItem.price;
            cart.items.splice(itemIndex, 1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }

    catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong.');
    }
}