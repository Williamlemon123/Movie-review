const mongoose = require('mongoose');

const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);
module.exports.db = mongoose.createConnection(mongoDB, {useNewUrlParser: true, retryWrites: true});