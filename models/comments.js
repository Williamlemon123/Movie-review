var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
  movie_name: {type: String, required: true},
  user_name: {type: String, required: true},
  content: {type: String},
  grade: {type: Number, required:true}
});

module.exports = mongoose.model('Comments', CommentsSchema);