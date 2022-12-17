var mongoose = require('mongoose');

var Manager = mongoose.model('Manager');
var Movie = mongoose.model("Movie");
var Comment = mongoose.model('Comments');

var managerController = {};


managerController.login = function (req, res) {
  var postData ={
    username: req.body._id,
    password: req.body.password
  }
  Manager.findOne({_id: postData.username, password: postData.password}, function(err, admin){
    if (err) {
      res.status(404).send(err);
      console.log(err);      
    }
    if (admin){
      res.send('login successfully');
    }else{
      res.send('wrong admin id or password!')
    }
    
  });
  
}

managerController.logout = function(req,res){
  //if(req.session.user){
  //  req.session.user = null;
    //res.redirect("/");
  //}
  //else{
    //res.redirect("/");
  //}
  
}

managerController.updatemovie = function (req, res) {
  Movie.findOne({ name: req.params.name }).exec(function (err, movie) {
    if (err) {
      res.status(404).send(err);
      console.log(err);
    } else {
      res.render("../views/manager/update_movie.ejs", { movie: movie });
      // res.json(comments);
    }
  });
};

managerController.addmovie = function (req, res) {
      res.render("../views/manager/add_movie.ejs",{ message:"" });
  // res.render("../views/user/add_comment.ejs");
};

// go to manager's movie page
managerController.godelete = function (req, res) {
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
      res.render("../views/manager/delete_comment.ejs", { movie: movie, comments: comments });
      // res.json(movie);

    }
  });
      // res.render("../views/manager/delete_comment.ejs", { movie: movie, comments: comment_out });
      // res.json(comments);
    }
  });
  // res.render("../views/manager/delete_comment.ejs");
};

managerController.manage = function (req, res) {
  Movie.find({}).exec(function (err, movies) {
    if (err) {
      res.status(404).send(err);
      console.log(err);
    } else {
      res.render("../views/manager/manage_movies.ejs", { movies: movies });
      //res.json(movies);
    }
  });
};



//
managerController.list = function(req, res) {
  Manager.find({}).exec(function(err, managers) {
    if(err) {
      res.status(404).send(err);
      console.log(err);
    }
    else {
      //res.render("../manager/all_managers", {managers: managers});
      res.json(managers);
    }
  });
};

managerController.show = function(req, res) {
  Manager.findOne({_id: req.params.id}).exec(function(err, manager) {
    if(err) {
      res.status(404).send(err);
    }
    else {
      //res.render("../views/manager/show", {manager: manager});
      res.json(manager);
    }
  });
};

managerController.create = function(req, res) {
  Manager.findOne({_id:req.body._id}).exec(function(err, admin){
    if (admin) {
        res.status(404).send({warning: 'Admin name repeated!'});
    }
    else{
        let manager = new Manager(req.body);
        manager.save(); 
      //res.render("../views/user/create");
        res.status(201).send(manager); 
    }
  });
};

managerController.update = function(req, res) {
   Manager.findOne({_id: req.params.id}, function(err, manager) {
    if(err){
          res.status(404).send(err);
        }
    else{
          manager.password = req.body.password;
        }
    manager.save();
    res.json(manager);
   });
  
};

managerController.delete = function(req, res) {
  Manager.deleteOne({_id: req.params.id}, function(err) {
    if(err) {
      res.status(404).send(err);
    }
    else {
      res.json({message: 'Manager deleted successfully!'});
      //res.redirect('/managers');
    }
  });
};

module.exports = managerController;