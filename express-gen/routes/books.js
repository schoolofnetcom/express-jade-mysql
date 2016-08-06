var express = require('express');
var router  = express.Router();
var db      = require('./../models');

router.get('/', function(req, res) {
  db.Books.findAll()
          .then(function(result) {
            res.render('books', {
              books: result
            });
          })
          .catch(function(err) {
            console.log('ERROR => ', err);
          })
});

router.get('/create', function(req, res) {
  res.render('new_books');
});

router.post('/', function(req, res) {
  db.Books.create(req.body)
          .then(function(result){
            res.redirect('/books');
          })
          .catch(function(err) {
            console.log('ERROR => ', err);
          });
});

module.exports = router;