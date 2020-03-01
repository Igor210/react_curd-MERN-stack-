// user.route.js

const express = require('express');
const userRoutes = express.Router();

// Require user model in our routes module
let Users = require('./user.model');

// Defined store route
userRoutes.route('/add').post(function (req, res) {
  let users = new Users(req.body);
  users.save()
    .then(users => {
      res.status(200).json({'users': users});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
  Users.find(function(err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

// Defined edit route
userRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Users.findById(id, function (err, user){
      res.json(user);
  });
});

//  Defined update route
userRoutes.route('/update/:id').post(function (req, res) {
  Users.findById(req.params.id, function(err, user) {
    if (!user)
      res.status(404).send("data is not found");
    else {
        user.full_name = req.body.full_name;
        user.user_id = req.body.user_id;
        user.email = req.body.email;
        user.birthday = req.body.birthday;

        user.save().then(user => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function (req, res) {
  Users.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = userRoutes;
