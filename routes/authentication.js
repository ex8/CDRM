const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const authenticationController = require('../controllers/authentication');

const router = express.Router();

router.get('/login', isLoggedIn, authenticationController.login);
router.post(`/login`, passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/account/login',
    failureFlash: true,
    successFlash: true
}));
router.get(`/register`, isLoggedIn, authenticationController.register);
router.post(`/register`, authenticationController.new);
router.get(`/logout`, authenticationController.logout);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/account')
    }
    else {
        next();
    }
}

module.exports = router;
