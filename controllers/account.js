const Client = require('../models/client');

module.exports.dashboard = (req, res) => {
    res.render(`dashboard`, {
        title: `Dashboard | CDRM`,
        user: req.user
    });
};

module.exports.projectList = (req, res) => {
    res.render(`project-list`, {
        title: `Projects | CDRM`
    })
};

module.exports.clientList = (req, res) => {
    Client
        .find({user: req.user})
        .exec()
        .then(clients => {
            res.render(`client-list`, {
                title: `Clients | CDRM`,
                clients: clients
            });
        })
        .catch(err => res.send(err));
};

module.exports.createClient = (req, res) => {
    Client
        .create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            postal: req.body.postal,
            country: req.body.country,
            user: req.user
        })
        .then(client => {
            res.redirect('/account/clients');
        })
        .catch(err => res.send(err));
};

module.exports.newClient = (req, res) => {
    res.render(`new-client`, {
        title: `Add New Client | CDRM`
    });
};

module.exports.clientDetail = (req, res) => {
    Client
        .findOne({uuid: req.params.uuid, user: req.user})
        .exec()
        .then(client => {
            res.render(`client-detail`, {
                title: `${client.name} | CDRM`,
                client: client
            });
        })
        .catch(err => res.send(err));
};

module.exports.clientUpdate = (req, res) => {

};
