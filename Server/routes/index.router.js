const express = require('express');
const router = express.Router();// call the router function from this express, returned object saved into router

const ctrlUser = require('../controllers/user.controller');//the exported function register inside this constant ctrl

const jwtHelper = require('../config/jwtHelper');//request attached with JWT token in the request header, in order to access this private route client-side

router.post('/register', ctrlUser.register);// using router cte, we will configure routing inside this application for user signUp

router.post('/authenticate', ctrlUser.authenticate);

router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;// export router constant from this index router