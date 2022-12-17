var mongoose = require('mongoose');
require('mongoose-type-url');

var MovieSchema = new mongoose.Schema({
  _id: {type: String},
  director: {type: String, required: true},
  name: {type: String, unique:true,required: true},
  avg_grade: Number,
  cnt_grading: Number,
  picture_url: String, //mongoose.SchemaTypes.Url,
  content: {type: String, required: true}
});

module.exports = mongoose.model('Movie', MovieSchema);