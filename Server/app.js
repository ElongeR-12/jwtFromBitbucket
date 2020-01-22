require('./config/config');
require('./models/db');//execute db.js
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');// execute passport config file

const rtsIndex = require('./routes/index.router');//  cste to configure routing middleware inside this application

var app = express();//to work with express

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());// in order to tell app.js we use passport authenthication
app.use('/api', rtsIndex);//configure routing middleware; so if we make '/api/register' it adds new user in application

// error handler/ handle global validations
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = []; // to store error messages
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));