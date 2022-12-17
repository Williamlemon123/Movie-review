var mongoose = require('mongoose');

var User = mongoose.model('User');

var Comment = mongoose.model('Comments');

var Manager = mongoose.model('Manager');

var Movie = mongoose.model("Movie");

var userController = {};

userController.login = function (req, res) {
  var postData ={
    username: req.body.name,
    password: req.body.password,
    type: req.body.type
  }
  if(postData.type === "user"){
    User.findOne({_id: postData.username, password: postData.password}, function(err, user){
    if (err) {
      res.status(404).send(err);
      console.log(err);      
    }
    if (user){
      // res.json("login success")
      res.redirect("/users/allmovies/"+user.name);
      // res.send('login successfully');
    }else{
      res.render("../views/login.ejs",{message:"Wrong user ID or password!"});
      // res.send('wrong user id or password!')
    }
    
  });
  } else {
    Manager.findOne({_id: postData.username, password: postData.password}, function(err, admin){
    if (err) {
      res.status(404).send(err);
      console.log(err);      
    }
    if (admin){
      res.redirect("/managers");
    }else{
      res.render("../views/login.ejs",{message:"No such manager! Wrong user ID or password!"});
      // res.send('wrong admin id or password!')
    }
    
  });
  }
  
  
}

userController.logout = function(req,res){
  //if(req.session.user){
  //  req.session.user = null;
    //res.redirect("/");
  //}
  //else{
    //res.redirect("/");
  //}
  
}

userController.newComment = function (req, res) {
    Movie.find({}).exec(function (err, movies) {
    if (err) {
      res.status(404).send(err);
      console.log(err);
    } else {
      res.render("../views/user/add_comment.ejs", { movies: movies, user_name:req.params.user_name });
      // res.json(movies);
    }
  });
  // res.render("../views/user/add_comment.ejs");
  // res.render("../views/user/add_comment.ejs", { user_name: req.params.user_name });
};

userController.newComment_only = function (req, res) {
    Movie.findOne({name:req.params.movie_name}).exec(function (err, movie) {
    if (err) {
      res.status(404).send(err);
      console.log(err);
    } else {
      res.render("../views/user/add_comment_only.ejs", { movie: movie, user_name:req.params.user_name, movie_name:req.params.movie_name });
      // res.json(movies);
    }
  });
  // res.render("../views/user/add_comment.ejs");
  // res.render("../views/user/add_comment.ejs", { user_name: req.params.user_name });
};

userController.allmovies = function (req, res) {
  Movie.find({}).exec(function (err, movies) {
    if (err) {
      res.status(404).send(err);
      console.log(err);
    } else {
      res.render("../views/user/all_movies.ejs", { movies: movies, username:req.params.user_name });
      // res.json(movies);
    }
  });
};

// get detail for the selected movie and all comments of it.
userController.moviedetail = function (req, res) {
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
      res.render("../views/user/user_movie_detail.ejs", { movie: movie, comments: comments, username: req.params.user_name });
      // res.json(movie);
    }
  });
      // res.render("../views/movies/movie_detail.ejs", { movie: movie, comments: comment_out });
      // res.json(comments);
      // res.render("../views/user/user_movie_detail.ejs", { movie: movie, comments: ["rte","abc"], username: req.params.user_name });
    }
  });
  // res.render("../views/user/user_movie_detail.ejs", { movie: "yes", comments: ["rte","abc"], username: req.params.user_name });
};

userController.list = function(req, res) {
  User.find({}).exec(function(err, users) {
    if(err) {
      res.status(404).send(err);
      console.log(err);
    }
    else {
      //res.render("../user/all_users", {users: users});
      res.json(users);
    }
  });
  };

userController.show = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function(err, user) {
    if(err) {
      res.status(404).send(err);
    }
    else {
      //res.render("../views/user/show", {user: user});
      res.json(user);
    }
  });
};



//user sign up
userController.create = function(req, res) {
  console.log("new user", req.body)
  User.findOne({_id:req.body._id}).exec(function(err, exname){
    if (exname) {
        res.render("../views/register.ejs",{message : "Name has already existed, please try another one!"});
    }
    else{
      let user = new User();
      user.name=req.body.name;
      user._id=req.body._id;
      user.email=req.body.email;
      user.password=req.body.password;
      user.save(); 
      //res.render("../views/user/create");
      
    }
  });
  res.render("../views/login.ejs",{message:""});
};





userController.delete = function(req, res) {
  User.deleteOne({_id: req.params.id}, function(err) {
    if(err) {
      res.status(404).send(err);
    }
    else {
      res.json({message: 'User deleted successfully!'});
      //res.redirect('/managers');
    }
  });
};

userController.update = function(req, res) {
   User.findById(req.params.id, function(err, user) {
    if(err){
          res.status(404).send(err);
        }
    else{
          user.email = req.body.email;
          user.name = req.body.name;
          user.password = req.body.password;
        }
    user.save();
    res.json(user);
   });
};

// go to login page
userController.go_login = function (req, res) {
  res.render("../views/login.ejs",{message:""});
  // res.json("heeeeeeeeeee");
};

// go to register page
userController.go_register = function (req, res) {
  res.render("../views/register.ejs",{message:""});
};


module.exports = userController;