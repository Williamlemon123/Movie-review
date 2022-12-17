var express = require('express');
var router = express.Router();

var comment = require('../controllers/CommentController.js');

// Get all comments
router.get('/:movie_name', comment.list);

// Get comments by user name and movie name
router.get('/show/:movie_name/:user_name', comment.show);

// Update a comment
router.post('/update', comment.update);

// go to comment update page
router.get('/update/:_id', comment.updateComment);

// Get comments of a specific user by user name
router.get('/show/:user_name', comment.show_by_user);

// Go to create comment page with moviename and user name
router.get('/getCreateComment/:movie_name/:user_name', comment.get_createComment_only);

// Create a comment
router.post('/createComment/:user_name', comment.createComment);

// Create a comment
router.post('/createComment/:movie_name/:user_name', comment.createComment_only);

// Create a comment
// router.post('/create', comment.create);

// Delete a comment
router.post("/delete", comment.delete); 

// Delete a comment by manager
router.post("/deletebymanager", comment.deleteByManager); 

// Delete a comment
// router.delete('/delete/:movie_name/:user_name', comment.delete);

module.exports = router;