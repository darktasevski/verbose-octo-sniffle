var express = require('express');
var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.send('hello from /blocks/');
    })
    // .post(function(req, res){
    //    // ...
    // })
router.route('/foo')
    .get(function(req, res){
        res.send('hello from /blocks/foo');
    })
    // .post(function(req, res){
    //     // ...
    // })

module.exports = router;
