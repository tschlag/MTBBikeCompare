//middleware function that verifies if a user is logged in or not

const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //checks for the token
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied.'});
    }

    //tries to verify token
    try {
        //verify token
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        //add user from payload
        req.user = decoded;
    //next function moves onto the next middleware function
    next();
    
    //if verification fails, then it outputs error
    } catch(e) {
        res.status(400).json({msg: 'Token is not valid'});
    }
}   

module.exports = auth;
