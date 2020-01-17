const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-yrhdj.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

app.use(cors());

app.use(routes);


app.listen(5000);


// ----------------------------------------------------------------
// PERSONAL ANNOTATIONS

// When using app.use() you are setting this config valid to all the routes
// if were using app.get() it will be setting this config only for that route

// app.use(express.json());
// Basically, This way the express will understand requisitions with JSON format


// HTTP METHODS:

// app.get() -> to get information, list users and so on
// app.post() -> to create information, save data 
// app.put() -> change something, change information
// app.delete() -> delete something

//_________________________________________________

// TYPES OF PARAMETERS

// Query Params (req.query) - used in the URL, they are showed in the URL 
// like http://localhost/?name=Bruno - used in filters, pagination

// Route params (req.params) - usually used when doing PUT or DELETE http method
// example: app.put('/route/:parameter')
// like http://localhost/user/1 - if it was DELETE, would delete the user ID = 1

// Body (req.body) - when using POST or PUT, when we are dealing with 
// user information, for example, the information must be hidden
// like passwords, email
// and they have to be passed throught the body requisition

