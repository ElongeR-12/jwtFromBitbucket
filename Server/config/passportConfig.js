const passport = require('passport');// authentication midleware in node.js application 
const localStrategy = require('passport-local').Strategy;//authentication midleware in node.js application, strategy from passport-local
const mongoose = require('mongoose');

//to interact with mongoDB
var User = mongoose.model('User');

// to configure authentication 
passport.use(
    new localStrategy({ usernameField: 'email' },// object of localStrategy class, as a construction
        (username, password, done) => {// arrow funct to verify whether the credentials email and password valid or not
            User.findOne({ email: username },// check whether we have a user of with given email adress
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);