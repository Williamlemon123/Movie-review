var mongoose = require("mongoose");

var Movie = mongoose.model("Movie");
// var Comment = mongoose.model('./models/Comments');
var Comment = mongoose.model('Comments');

var movieController = {};

// var comment = require('CommentController.js');

movieController.list = function (req, res) {
  Movie.find({}).exec(function (err, movies) {
    if (err) {
      res.status(404).send(err);
      console.log(err);
    } else {
      res.render("../views/index.ejs", { movies: movies });
      // res.json(movies);
    }
  });
};

// get detail for the selected movie and all comments of it.
movieController.show = function (req, res) {
  Movie.findOne({ name: req.params.name }).exec(function (err, movie) {
    if (err) {
      res.status(404).send(err);
    } else {
      Comment.find({movie_name: req.params.name}).exec(function(err, comments) {
    if(err) {
      res.status(404).send(err);
      console.log(err);
    }
    else {
      res.render("../views/movies/movie_detail.ejs", { movie: movie, comments: comments });
      // res.json(movie);
    }
  });
      // res.render("../views/movies/movie_detail.ejs", { movie: movie, comments: comment_out });
      // res.json(comments);
    }
  });
};



movieController.create = function (req, res) {
  console.log("new movie", req.body);
  var message = "";
  Movie.findOne({_id:req.body._id}).exec(function(err, exmovie){
    if (exmovie) {
        message = "Movie name or ID already exists!"
        res.render("../views/manager/add_movie.ejs",{ message:message });
        // res.status(404).send({warning: 'movie name already exists!'});
    }
    else{
        req.body.avg_grade = 0;
        req.body.cnt_grading = 0;
        let movie = new Movie(req.body);
        movie.save();
        //res.render("../views/movies/create");
        // res.status(201).send(movie);
        res.redirect("/managers")
    }
  });
};

movieController.delete = function (req, res) {
  const deletedItemId = req.body.deleteMovieBtn;
  // Movie.findById(req.params.id, function (err, movie) {
  //   movie.remove(function (err) {
  //     if (err) {
  //       res.status(404).send(err);
  //     } else {
  //       res.redirect('/');
  //       res.status(204).send("Movie removed!");
  //       //res.redirect('/movies');
  //     }
  //   });
  // });
  Movie.findByIdAndDelete(deletedItemId, function (err) {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/managers");
    } else {
      console.log(err);
    }
  });
};

movieController.update = function (req, res) {
  const updatedItemId = req.body.updateMovieBtn;
  const newdirector = req.body.new_director;
  const newcontent = req.body.new_content;
  const newpic = req.body.new_pic;
  const new_count = Comment.count({movie_name: req.body.name});
  console.log(new_count);
  var moviename = "";
  Movie.findById(updatedItemId, function(err, item){
    if(!err){
      moviename = item.name;
    } else {
      console.log(err);
    }
  });
  Movie.findByIdAndUpdate(
    updatedItemId,
    {
      $set: {
        director: newdirector,
        // name: req.body.name,
        //avg_grade: req.body.avg_grade,
        //cnt_grading: req.body.cnt_grading,
        picture_url: newpic,
        content: newcontent,
      },
    },
    { new: true },
    function (err, movie) {
      if (err) {
        res.status(404).send(err);
      }
      // res.json(movie);
      movie.save();
      res.redirect("/managers/update/"+moviename);
      
    }
  );
};

module.exports = movieController;
