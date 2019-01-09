const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const clientSchema = new Schema({
    uuid: {
        type: String,
        default: uuid.v4,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: String,
    city: String,
    state: String,
    postal: String,
    country: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: `User`,
        required: true
    }
});

clientSchema.pre(`save`, function (next) {
    if (this.isModified()) this.updated = Date.now();
    next();
});

clientSchema.virtual(`url`).get(function () {
    return `/account/clients/${this.uuid}`;
});

clientSchema.virtual(`name`).get(function () {
    return `${this.first_name} ${this.last_name}`;
});

clientSchema.virtual(`fullAddress`).get(function () {
    return `${this.address}, ${this.city}, ${this.state} ${this.postal}`;
});

const Client = mongoose.model(`Client`, clientSchema);
module.exports = Client;
