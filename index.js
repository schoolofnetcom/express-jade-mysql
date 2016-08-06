var express = require('express');
var app     = express();
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body == 'object' && '_method' in req.body) {
    var method = req.body._method;

    delete req.body._method;

    return method;
  }
}))


var sequelize = new Sequelize('mysql://root:@localhost:3306/expressjm');

var User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING
  },
  lastname: Sequelize.STRING
});

User.sync()
    .then(function() {
      return User.create({
        name: 'Otavio',
        lastname: 'Pimentel'
      });
    });

app.get('/users', function(req, res) {
  User
    .findAll()
    .then(function(result) {
      res.render('users', {
        message: 'List of users',
        data   : result
      });
    })
    .catch(function(err) {
      console.log('Error =>', err);
    });
});

app.get('/users/create', function(req, res) {
  res.render('new_users', {
    message: 'Create an user'
  });
});

app.get('/users/edit/:id', function(req, res) {
  User
    .findById(req.params.id)
    .then(function(result) {
      res.render('edit_users', {
        message: 'Editing user',
        data   : result
      });
    })
    .catch(function(err) {
      console.log('Error =>', err);
    })
});

app.put('/users/edit/:id', function(req, res) {
  User
    .update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function(result){
      res.redirect('/users');
    })
    .catch(function(err) {
      console.log('Error =>', err);
    });
});

app.post('/users/create', function(req, res) {
  User
    .create(req.body)
    .then(function() {
      res.render('new_users', {
        message: 'Create an user'
      });
    })
    .catch(function(err) {
      console.log('Error =>', err);
    });
});

app.delete('/users/:id', function(req, res) {
  User
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function() {
      res.redirect('/users');
    })
    .catch(function(err) {
      console.log('Error =>', err);
    });
});

app.get('/users/:id', function(req, res) {
  User
    .findById(req.params.id)
    .then(function(result) {
      res.render('user', {
        message: 'A user',
        data: result
      });
    })
    .catch(function(err) {
      console.log('Error =>', err);
    });
  // User
  //   .findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //   .then(function(result) {
  //     res.render('user', {
  //       message: 'A user',
  //       data: result
  //     });
  //   })
  //   .catch(function(err) {
  //     console.log('Error =>', err);
  //   });
});

app.get('/', function(req, res) {
  res.render('index', {
    message: 'Hello world from School of net',
    count  : 10
  });
});

app.listen(3000, '127.0.0.1', function() {
  console.log('The express server has been started...');
});

