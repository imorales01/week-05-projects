const express = require('express');
const models = require('../models');

const PostsController = {
  registerRouter() {
    const router = express.Router();
/*
 this function in comments are simmilar to the router.get____ but this time 
 you are calling the index and create function, its easier to use this so that 
 you can see it better

 app.get('/', (req,res) => {
    res.send('HelloWorld')
 })
*/
    router.get('/', this.index);
    router.post('/', this.create);

    return router;
  },
  index(req, res) {
    // gets all the posts -> queries database
    // this command gets all of the id and puts in decending order
    models.Posts.findAll({order: [['id', 'DESC']]})
      .then((posts) => {
        // json is the view option to be seen on the front end -> not using react
        // res.json(posts);
        // this allows us to get straight from database
        res.render('posts', { posts });
      });
  },
  create(req, res) {
    models.Posts.create({
      post: req.body.post,
      author: req.body.author
    })
    .then((post) => {
      res.redirect('/posts');
    })
    .catch((err) => {
      console.log('ERROR while creating a new post');
      res.redirect('/error');
    })
  }
};

module.exports = PostsController.registerRouter();
