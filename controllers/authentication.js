const User = require('../models/user');

module.exports.login = (req, res) => {
    res.render('login', {
        title: `Login | CDRM`,
        message: req.flash()
    });
};

module.exports.register = (req, res) => {
    res.render(`register`, {
        title: `Register | CDRM`,
        message: req.flash()
    });
};

module.exports.new = (req, res) => {
    let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    user.save()
        .then(user => res.render('register', {message: `New user created`}))
        .catch(err => res.render('register', {message: `New user error`}));
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/account/login');
};
