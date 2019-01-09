const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
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
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, () => {}, (err, hashed) => {
            if (err) return next(err);
            this.password = hashed;
            next();
        });
    });
});

userSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.virtual('name').get(function () {
    return `${this.first_name} ${this.last_name}`;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
