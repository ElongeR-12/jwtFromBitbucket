// check env.
var env = process.env.NODE_ENV || 'development'; // check for production
// fetch env. config
var config = require('./config.json');
var envConfig = config[env];// based on environnement
// add env. config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);//in order to achieve a value for port number and MongoDB URI independent of environnement