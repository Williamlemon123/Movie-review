var mongoose = require('mongoose');
//var db = mongoose.MongoClient.db('Movie');

var Comment = mongoose.model('Comments');
var Movie = mongoose.model('Movie');

var CommentController = {};

CommentController.list = function(req, res) {
  Comment.find({movie_name: req.params.movie_name}).exec(function(err, comments) {
    if(err) {
      res.status(404).send(err);
      console.log(err);
    }
    else {
       //res.render("../comments/all_comments", {comments: comments});
      res.json(comments);
      return comments
    }
  });
  };

CommentController.show_by_user = function(req, res) {
  Comment.find({user_name: req.params.user_name}).exec(function(err, comments) {
    if(err) {
      res.status(404).send(err);
    }
    else {
      res.render("../views/user/manage_comments.ejs", {comments: comments, user_name: req.params.user_name});
      //res.json(comments);
    }
  });
};

CommentController.show = function(req, res) {
  Comment.find({movie_name:req.params.movie_name,user_name: req.params.user_name}).exec(function(err, comments) {
    if(err) {
      res.status(404).send(err);
    }
    else {
      //res.render("../views/user/manage_comments.ejs", {comments: comments});
      res.json(comments);
    }
  });
};

// CommentController.create = function(req, res) {
//   console.log("new comment", req.body)
//   let comment = new Comment(req.body);
//   comment.save();
//   // let movie = 
//   Movie.findOne({name: comment.movie_name}).exec(function(err, movie){
//     if(err){
//       res.status(404).send(err)
//     }
//     else{
//       let old_cnt = movie.cnt_grading;
//       let new_cnt = old_cnt + 1;
//       //console.log(old_cnt);
//       //console.log(new_cnt);
//       //console.log(movie.avg_grade);
//       //console.log(req.body.grade);
//       movie.cnt_grading = new_cnt;
//       movie.avg_grade = (movie.avg_grade * old_cnt + req.body.grade) / new_cnt;

//       movie.save();

//     }
    
//   });
//   //res.render("../views/comments/create");
//   res.status(201).send(comment);
// };


/*
 CommentController.delete = function(req, res) {
   Comment.findOne({movie_name: req.params.movie_name, user_name: req.params.user_name}, function(err,comment) {
     if(err) {
       res.status(404).send(err);
     }
     else {
       Movie.findOne({name: comment.movie_name}).exec(function(err, movie){
        if(err){
          res.status(404).send(err)
    }
        else{
          let old_cnt = movie.cnt_grading;
          let new_cnt = old_cnt - 1;
          movie.cnt_grading = new_cnt;
          movie.avg_grade = (movie.avg_grade * old_cnt - comment.grade) / new_cnt;
          movie.save();
      }
    
    });
       comment.remove();
       res.json({message: 'Comment deleted successfully!'});
       //res.redirect('/comments');
     }
   });
 };
*/

CommentController.delete = function (req, res) {
  const deletedItemId = req.body.deleteBtn;
  Comment.findById(deletedItemId, function(err, comment){
    if(err){
       console.log(err);
    } else {
        var username = comment.user_name;
        Movie.findOne({name: comment.movie_name}).exec(function(err, movie){
          if(err){
            res.status(404).send(err)
          }
          else{
            let old_cnt = movie.cnt_grading;
            if (old_cnt>1){
              let new_cnt = old_cnt - 1;
              movie.cnt_grading = new_cnt;
              movie.avg_grade = (movie.avg_grade * old_cnt - parseInt(comment.grade)) / new_cnt;
              movie.save();
            }
            else {
              movie.cnt_grading = 0;
              movie.avg_grade = 0;
              movie.save();              
            }
          }
    
        });   
        comment.remove();
        res.redirect("/comments/show/" + username);        
      }
  });
};

CommentController.deleteByManager = function (req, res) {
  const deletedItemId = req.body.deleteCommentBtn;
  var moviename = "";
  Comment.findById(deletedItemId, function(err, item){
    if(!err){
      moviename = item.movie_name;
    } else {
      console.log(err);
    }
  });
  Comment.findByIdAndDelete(deletedItemId, function (err,comment) {
    if (!err) {
      var username = comment.user_name;
       var prev_grade = comment.grade;
       Movie.findOne({name: comment.movie_name}).exec(function(err, movie){
          if(err){
            res.status(404).send(err)
          }
          else{    
            if(movie.cnt_grading > 1){
              movie.avg_grade = (movie.avg_grade * movie.cnt_grading - prev_grade) / movie.cnt_grading;
            }
            else{
              movie.avg_grade = 0;
            }
            movie.save();
          }
         });
      console.log("Successfully deleted");
      res.redirect("/managers/manage/"+moviename);
    } else {
      console.log(err);
    }
  });
};

/*CommentController.delete = function (req, res) {

  const deletedItemId = req.body.deleteBtn;
  var username = "";
  Comment.findById(deletedItemId, function(err, item){
    if(!err){
      username = item.user_name;
    } else {
      console.log(err);
    }
  });
  
  Comment.findByIdAndDelete(deletedItemId, function (err) {
    if (!err) {
      //console.log("Successfully deleted");
      res.redirect("/comments/show/" + username);
    } else {
      console.log(err);
    }
  });
};*/

// CommentController.update = function(req, res) {
//     Comment.findOne({movie_name: req.params.movie_name, user_name: req.params.user_name}, function(err, comment) {
//      if(err){
//            res.status(404).send(err);
//          }
//      else{
//        var prev_grade = comment.grade;
//        comment.content = req.body.content;
//        comment.grade = req.body.grade;
//        Movie.findOne({name: comment.movie_name}).exec(function(err, movie){
//         if(err){
//           res.status(404).send(err)
//     }
//         else{
//           //console.log(comment.grade);
//           //console.log(movie.cnt_grading);
//           //console.log(movie.avg_grade);
//           //console.log(prev_grade);          
//           movie.avg_grade = (movie.avg_grade * movie.cnt_grading - prev_grade + comment.grade) / movie.cnt_grading;
//           movie.save();
//       }
    
//     });
//      }
//      res.json(comment);
//      comment.save();
//     });
//  };
/*
CommentController.update = function (req, res) {
  const updatedCommentId = req.body.updateCommentBtn;
  const newRating = req.body.new_rating;
  const newContent = req.body.new_content;

  var username = "";
  Comment.findById(updatedCommentId, function(err, item){
    if(!err){
      username = item.user_name;
    } else {
      console.log(err);
    }
  });
  
  Comment.findByIdAndUpdate(
    updatedCommentId,
    {
      $set: {
        content: newContent,
        // name: req.body.name,
        //avg_grade: req.body.avg_grade,
        //cnt_grading: new_count,
        grade: newRating,
      },
    },
    { new: true },
    function (err, content) {
      if (err) {
        res.status(404).send(err);
      }
      // res.json(movie);
      content.save();
      res.redirect("/comments/show/" + username);
      
    }
  );
};
*/

CommentController.update = function (req, res) {
  const updatedCommentId = req.body.updateCommentBtn;
  const newRating = req.body.new_rating;
  const newContent = req.body.new_content;

  Comment.findById(updatedCommentId , function (err, comment) {
    if (err) {
      res.status(404).send(err);
      console.log(err);
    } else {
       var username = comment.user_name;
       var prev_grade = comment.grade;
       comment.content = newContent;
       comment.grade = newRating;
       Movie.findOne({name: comment.movie_name}).exec(function(err, movie){
          if(err){
            res.status(404).send(err)
          }
          else{        
            movie.avg_grade = (movie.avg_grade * movie.cnt_grading - prev_grade + parseInt(comment.grade)) / movie.cnt_grading;
            movie.save();
          }
         });
         comment.save();
         res.redirect("/comments/show/" + username);
      }
  });
      
};


CommentController.updateComment = function (req, res) {
  Comment.findById(req.params._id , function (err, comment) {
    if (err) {
      res.status(404).send(err);
      console.log(err);
    } else {
      res.render("../views/user/update_comment.ejs", { comment: comment });
      //comment.save();
      //res.json(comment);
    }
  });
};


CommentController.createComment = function(req, res) {
  var message = "";
  Comment.findOne({movie_name : req.body.movie_name, user_name : req.params.user_name}).exec(function(err, excomment){
    if (excomment) {
        message = "Comment for this movie already exists!"
        res.render("../views/user/add_comment.ejs",{ message : message, user_name: req.params.user_name });
        // res.status(404).send({warning: 'movie name already exists!'});
    }
    else{
        console.log("new comment", req.body);
        let comment = new Comment(req.body);      
        comment.user_name = req.params.user_name;
        comment.save();

        Movie.findOne({name: comment.movie_name}).exec(function(err, movie){
          if(err){
            res.status(404).send(err)
          }
          else{
            let old_cnt = movie.cnt_grading;
            let new_cnt = old_cnt + 1;
            movie.cnt_grading = new_cnt;
            movie.avg_grade = (movie.avg_grade * old_cnt + parseInt(comment.grade)) / new_cnt;

            movie.save();

        }
          
      });      
      
        //res.render("../views/movies/create");
        // res.status(201).send(movie);
      res.redirect("/comments/show/" + req.params.user_name);
    }
  });
};

// Create comment with movie name and user name
CommentController.createComment_only = function(req, res) {
  var message = "";
  Comment.findOne({movie_name : req.params.movie_name, user_name : req.params.user_name}).exec(function(err, excomment){
    if (excomment) {
      message = "Your comment for this movie already exists!"
      Movie.findOne({name : req.params.movie_name}).exec(function(err, movie){
        if(err){
          res.status(404).send(err)
        } else {
          res.render("../views/user/add_comment_only.ejs",{ message : message, username: req.params.user_name, movie:movie, movie_name:req.params.movie_name, });
        }
        
      });
      
        
        // res.status(404).send({warning: 'movie name already exists!'});
    }
    else{
        console.log("new comment", req.body);
        // req.body.user_name = ;
        let comment = new Comment(req.body);      
        comment.user_name = req.params.user_name;
        comment.movie_name = req.params.movie_name;
        comment.save();

        Movie.findOne({name: comment.movie_name}).exec(function(err, movie){
          if(err){
            res.status(404).send(err)
          }
          else{
            let old_cnt = movie.cnt_grading;
            let new_cnt = old_cnt + 1;
            movie.cnt_grading = new_cnt;
            movie.avg_grade = (movie.avg_grade * old_cnt + parseInt(req.body.grade)) / new_cnt;

            movie.save();

        }
          
      });      
      
        //res.render("../views/movies/create");
        // res.status(201).send(movie);
      res.redirect("/users/show/" + req.params.movie_name+"/"+req.params.user_name);
    }
  });
};

// go to add comment page with movie name and user name
CommentController.get_createComment_only = function(req, res) {
  var movie_name= req.params.movie_name;
  var user_name = req.params.user_name;
  Movie.findOne({name: movie_name}).exec(function(err, movie){
        if(err){
          res.status(404).send(err)
    }
        else{        
          res.render("../views/user/add_comment_only.ejs", { message:"",movie:movie, movie_name:movie_name, username:user_name });
      }
    
    });
  
}

module.exports = CommentController;