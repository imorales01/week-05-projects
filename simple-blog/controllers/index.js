const express = require('express');
// router: modidulizethe code that handles the routes
// for get put and so on
const router = express.Router();

// these two are going to handle all of the home and posts stuff
// this is good for having team memebers work on different stuff
router.use('/', require('./home'));
router.use('/posts', require('./posts'));


module.exports = router;
