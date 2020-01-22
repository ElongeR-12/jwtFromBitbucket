const express = require('express');
const router = express.Router();// call the router function from this express, returned object saved into router

const ctrlUser = require('../controllers/user.controller');//the exported function register inside this constant ctrl

router.post('/register', ctrlUser.register);// using router cte, we will configure routing inside this application for user signUp

module.exports = router;// export router constant from this index router