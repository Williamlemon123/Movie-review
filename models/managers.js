var mongoose = require('mongoose');

var ManagerSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  password: {type: String, required: true} 
});

module.exports = mongoose.model('Manager', ManagerSchema);