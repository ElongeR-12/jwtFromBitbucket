const mongoose = require('mongoose');

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