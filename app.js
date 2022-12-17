// server.js
// where your node app starts

//init project
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Cookies = require("cookies");
let session = require('express-session');

// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);
mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// set the view engine link to css
app.use(express.static(__dirname + '/assets'));
app.set("view engine", "ejs")


// Import data models
const Movie = require('./models/movies');
const Manager = require('./models/managers');
const User = require('./models/user');
const Comment = require('./models/comments');
// Load routes
const movies = require('./routes/movies');
const managers = require('./routes/managers');
const users = require('./routes/users');
const comments = require('./routes/comments');
const index = require('./routes/index');

app.use('/movies', movies);
app.use('/users', users);
app.use('/comments',comments);
app.use('/managers', managers);
app.use('/', index);




// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});