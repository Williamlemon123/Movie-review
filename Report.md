# INFSCI 2560 Project - Movie Grading System

- Group Members
  - Yichun Tao: yit44@pitt.edu
  - Lin Yang: liy80@pitt.edu
  - Xin Yang: xiy107@pitt.edu
  - Wanhao Yu: way19@pitt.edu

## Demo Correction

In demo presentation, adding/updating/deleting comments have errors on synchronizing the movie's average score.
Cause of the problem was that user's input score wasn't protected well and thus the input's type was String during front-end and back-end interaction.
This problem has been corrected by ensuring type of data when processing the user’s input value.

At the same time, professor found that users can input random strings into comment’s movie score.
Now, we restrict the user's input by only allowing to select some pre-defined scores, which are one, two, three, four and five.
This change makes the system more stable and reliable, and the system can withstand random string errors and attacks now.

## Introduction

In this project we are going to build a online movie rating application.
User can use this application to register an account so they can rating the movie and write their comments of movies.
User can also delete their comments or update their rating of movies just like the rating website we are using in real life.
This application also has management module so manager (administrator) can log in and manage both movie items and user items. For example,
if some user use this application illegally, web manager can delete their comment, or even delete this user!!!

## Objective

There are 4 collections in the database : user, movies, managers, comments

### user

- user should be able to sign up
- user should be able to log in if they've signed up already
- user should be able to browse movies intro and average rating on the homepage
- user should not be able to write comment or rate a movie if they don't log in
- user should be able to manage their personal information, comment and rating

### movies

- movie information should be changed only by admin not by user
- movie should be added by admin
- movie should be deleted by admin
- movie should be able to be searched by movie name
- movie rating and number of comments should be updated automatically if user rating or comment change
- the rating and comment count should be automatically set to 0 when first time added to the database

### comments

- all comment of the same movie should be gathered
- comment could be null but not score since this is a rating application
- comment could be update or delete by user or by admin

### manager

- manager should be able to log in a different way from user
- manager should be able to manage movie
- manager should be able to manage user
- manager should be able to manage comment
- manager should not be able to manager other manager

## Team member's contributions

### Front end

--> Chris Yang \
design UI of user \
design UI of register/login \
design UI of comments \
CRUD function of comments \
User's Back-end and Front-end interaction \
Error handling

--> Yichun Tao\
design ER diagram \
UI of CRUD functions of movies \
UI of views/manager \
UI of views/movies \
UI of index \
UI of one of add comment method to movies (enter from /users/show/:name/:user_name -> moviedetail page after user login) \
UI of user's allmovie page and moviedetail page \
combined backend and frontend of all UI above and login page

### Back end

--> Xin Yang \
design data models \
setting up the application \
implement apis of user \
implement apis of movies \
implement apis of comments \
apis test

--> Wanhao Yu \
design data models \
setting up environment \
implement api functions of user \
implement api functions of manager \
implement CRUD functions of comments \
error handling

## Technical Architecture

### FrameworK:

Node JS with Express \
Implement functions by files in "controllers" folder

### Model:

MongoDB and the Mongoose ODM with Express JS \
Implement model and connect database by files in "models" folder and "routes" folder

### View:

EJS Template system with Express + JavaScript + CSS + BootStrap \
Implement webpage design by files in "views" folder and "assets" folder

## Challenges

1. We are using model method to CRUD data so it is challenging to perform "cross collection" operation and sync data in time.
2. We are developing on Glitch directly but Glitch stop working from time to time make it really hard to debug
3. Problems related to limited conditions need to be considered very carefully. For example, /:id and /update can make user's id equals to update
4. It can be difficult to debug when merging front-end and back-end work together. The transmission of data from front-end to back-end
   may have conflicts in design with unplanned new functions as two parts of work are completed by different group members.

## Future Work

In our application, we now only provide the basic functions for users and web managers.

1. We are planning to add the functions to managers, make managers able to add some bad users to blacklist if they keep sending bad comments.
2. Enable managers to modify and delete the blacklist.
3. Add email authentication method and password encryption.
4. Add movie ranking functions based on the rating scores or rating counts.

## Conclusions

Through completing this project, we have successfully applied what we've learned in the web technologies and standards course. We've
got familiar with the web frameworks, web database and webpage designs. Inspired by introductions of this course, we've found better ways
to get started on new web apis, devtools, data operations and so on. Also, we've got a lesson that testing need great considerations to
find out and avoid potiential errors before the errors mess up the project. The role of MongoDB in this project and many other mature apis
taught us to learn more on different platforms.

## Resources

MongoDB & Express JS Docmentations
https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial

Reference Bootstrap HTML
https://themeforest.net/item/royalking-hotel-booking-html-template/40626124

EJS to template your Node.js application
https://blog.logrocket.com/how-to-use-ejs-template-node-js-application/

## Documentation

← `models folder`: set up four schema models: user, managers, movies, comments, stored in the MongoDB.

← `routes folder`: definition of detailed path and apply corresponding functions.

← `controllers folder`: implementation of detailed operation functions for corresponding models and routers.

← `views folder`: contain front-ended ejs files

← `assets folder`: contain CSS files and front-ended supporting files

← `package.json`: prepare the library environment

← `.env`: private settings to connect to MongoDB
