var express = require('express');
var router = express.Router();
var manager = require('../controllers/managerController.js');
var movie = require('../controllers/MovieController.js');


// Get all managers
// router.get('/', manager.list);
router.get('/', manager.manage);

// go to movie update page
router.get('/update/:name', manager.updatemovie);

// go to add movie page
router.get('/addmovie', manager.addmovie);

// go to movie details page for manager
router.get('/manage/:name', manager.godelete);

// Get all managers
// router.get('/all', manager.list);

// Get manager by name
router.get('/show/:id', manager.show);

// create a manager
router.post('/create', manager.create);

// manager login
router.post('/login', manager.login);
//router.get('/logout', manager.logout);

// Update
router.put('/update/:id', manager.update);

// Delete a manager
router.delete('/delete/:id', manager.delete);


module.exports = router;