const express = require('express');
const accountController = require('../controllers/account');

const router = express.Router();

router.get('/', isLoggedIn, accountController.dashboard);
router.get('/projects', isLoggedIn, accountController.projectList);
router.get('/clients', isLoggedIn, accountController.clientList);
router.post(`/clients`, isLoggedIn, accountController.createClient);
router.get(`/clients/add`, isLoggedIn, accountController.newClient);
router.get(`/clients/:uuid`, isLoggedIn, accountController.clientDetail);
router.put(`/clients/:uuid`, isLoggedIn, accountController.clientUpdate);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/account/login');
    }
}

module.exports = router;
