var mongoose = require('mongoose');
require('mongoose-type-email');

var UserSchema = new mongoose.Schema({
  _id: {type: String},
  email: {type:String, unique:true,required: true},
  name: {type: String, required: true},
  password: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);