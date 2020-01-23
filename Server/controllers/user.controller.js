const mongoose = require('mongoose');
const passport = require('passport');

const _ = require('lodash');// in order to pick up just email and fullname of user

const User = mongoose.model('User');

//define a function for user registration or user sign up
module.exports.register = (req, res, next) => {
    var user = new User();//make an object of this user model
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    // one more property saltsecret --> used for encryption and decryption of pasword string saved inside pasword field
    // we need pre-events to save function from Mongoose, that means before save doc
    user.save((err, doc) => {//save the recored user 
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000) // look for duplicate email adress
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err); // remaining validation error messages can be handled globally inside this application
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

//to display details of curently authenticated user like email first name, last name
module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },// req._id is stored from JWT verification
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}