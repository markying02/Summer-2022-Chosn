const router = require('express').Router();
let User = require('../models/user.model');


// Handles incoming GET requests
router.route('/').get((req, res) => {

    // Gets a list of all users from the database
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});


// Set add endpoint to post new users
router.route('/add').post((req, res) => {
    // Retrieve fields from request
    const username = req.body.username;
    const goal1 = req.body.goal1;
    const goal2 = req.body.goal2;
    const goal3 = req.body.goal3;
  
    // Create new user with retrieved fields
    const newUser = new User({
        username,
        goal1,
        goal2,
        goal3,
    });

    
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Set endpoint to get users by id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
})
  
module.exports = router;