var express = require('express');
var router = express.Router();

var Post = require('../models/post');
var dbApi = require('../helpers/dbApi');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req);
    dbApi.openConnection(function(db){
        Post.find({}, function(err, posts){
            console.log(err, posts);
            res.render('createPost', { title: 'Express', posts:posts});
            db.close();
        });
    });
});

router.post('/createDummyPost',function(req, res, next){
    var newRandomPost = new Post({title: req.body.test_param, content:Math.random().toFixed(5)});

    console.log(req.body, newRandomPost);
    dbApi.openConnection(function(db){
        newRandomPost.save(function(err, saved){
            res.redirect('/');
            db.close();
        });
    });
});

module.exports = router;
