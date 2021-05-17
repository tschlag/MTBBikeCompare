//brings router from express, used for all of the routes
const {Router} = require('express');
//brings authController from the controllers' folder 
const authController = require('../controllers/authControllers');
const router = Router();
//brings the middleware function auth from the middleware folder
const auth = require('../middleware/auth');

//create the 3 routes
//post is a request, user will enter in information
router.post('/register', authController.signup);
//this post handles the user login and checks whether the creds are correct
router.post('/login', authController.login);
//get request used to try to retrieve whether a user is logged in or not
router.get('/user', auth, authController.get_user);
//logout will be handled on the client side using JWT Token

module.exports = router;