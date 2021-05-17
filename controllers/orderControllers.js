const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const config = require('config');
const stripe = require('stripe')(config.get('StripeAPIKey'));


//func to get all orders for a user
//sort orders in descending date ordered and return json response
module.exports.get_orders = async (req, res) => {
    const userId = req.params.id;
    Order.find({userId}).sort({date:-1}).then(orders => res.json(orders));
}