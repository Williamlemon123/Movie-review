var express = require("express");
var router = express.Router();
var comment = require('../controllers/CommentController.js');
var user = require("../controllers/userController.js");

// Get all users
router.get("/", user.list);

// Get user by name
router.get("/show/:id", user.show);


// Get all movies for all_movies page
router.get("/allmovies/:user_name",user.allmovies);

// router.get('/addcomment/:movie_name/:user_name', comment.show);
// Get movies by name
router.get('/show/:name/:user_name', user.moviedetail);



router.get("/login", user.go_login);
// router.get("/gologin",comment.go_login)

router.get("/register", user.go_register);

// go to add comment page
router.get('/newComment/:user_name', user.newComment);

// go to add comment page
router.get('/newComment/:movie_name/:user_name', user.newComment_only);

// Create a user
router.post("/create", user.create);

//user login
router.post("/login",user.login);
//router.get('/logout', user.logout);

// Delete a user
router.delete("/delete/:id", user.delete);

// Update a user
router.put("/update/:id", user.update);

module.exports = router;
