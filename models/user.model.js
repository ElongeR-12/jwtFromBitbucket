const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');// first require bcryptjs

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) { // this will be invoked before excecuting save into user.controller.js
    bcrypt.genSalt(10, (err, salt) => {//in order to generate a randum salt secret code
        bcrypt.hash(this.password, salt, (err, hash) => {// encrypt the password from the client side using this saltsecret code
            this.password = hash;
            this.saltSecret = salt;
            next();// it only will execute the remaining save operation here
        });
    });
});

mongoose.model('User', userSchema);// register this user schema object inside Mongoose, it will be save in a collection with name users