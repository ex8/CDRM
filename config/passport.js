`use strict`;
const Strategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = passport => {
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user))
            .catch(err => done(err, null));
    });

    passport.use('local', new Strategy((username, password, done) => {
        User.findOne({username: username})
            .then(user => {
                if (!user) return done(null, false, {message: `Incorrect username`});
                if (!user.comparePasswords(password)) return done(null, false, {message: `Incorrect password`});
                return done(null, user);
            })
            .catch(err => done(err));
    }));
};
