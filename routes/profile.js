const express = require('express');
const router = express.Router();

// middleware to check if user is logged in (ran before user is directed to their profile)
const isLoggedIn = (req, res, next) => {
    if(!req.user){ // if user is not logged in
        res.redirect('/auth/login');
    } else { // if user is logged in
        next();
    }
};

// Route: User profile is shown
router.get('/', isLoggedIn, (req, res) => {
    res.status(200).json('User ' + req.user.username + ' is logged in.');
});

module.exports = router;