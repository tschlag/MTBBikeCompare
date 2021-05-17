//this controller file handles all of the logic for the registration, login, 
//and fetchin user to see if they are authenticated or not.
//Consists of 3 functions, one for each route

const User = require('../models/User');
//creates the JSON web tokens
const jwt = require('jsonwebtoken');
//lets us store the JWT secret code
const config = require('config');
//hash the passwords before storing them in the DB 
const bcrypt = require('bcrypt');


//registration function signup
//all about registering a new person to the system
module.exports.signup = (req, res) => {
    //deconstruct the request body to get a name, email, and password
    const{name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400).json({msg: 'Please enter all fields.'});
    }

    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: 'User already exists'});

        const newUser = new User({name, email, password});

        //Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            {id: user._id},
                            config.get('jwtsecret'),
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )
                    });
            })
        })
    })
}

//creates a function for the user login process
module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({msg: 'Please enter all fields'});
    }

    //search the DB for the user using their email
    User.findOne({email})
        .then(user => {
            if (!user) return res.status(400).json({msg: 'User does not exist'});

            //validate password
            //Compares encrypted stored password and encrypts entered password
            //to compare to the store password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    //if password is not a match, return status 
                    if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'});
                    
                    jwt.sign(
                        {id: user._id},
                        config.get('jwtsecret'),
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                //returns user details except password
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })

}

//get_user function finds the user by it's id and returns the user 
//without its password as the JSON response
module.exports.get_user = (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}


