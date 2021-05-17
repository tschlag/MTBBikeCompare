//required imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const app = express();

//call the express app to use it in our app
app.use(express.json());

//sets up server file to serve static content generated from React app in production
//only will work in production environment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    });
}

//configure the server file to connect to the MongoDB database and then start running the server
//to listen to our requests on port 4000
//mongoose is used to connect to database
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true,
useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(port)) //arrow function creates really short functions
    .catch((err) => console.log(err))


