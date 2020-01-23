const jwt = require('jsonwebtoken');

// define a function to JWT verification for private route
module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)// to make a get request to consume the private route from client-side
        token = req.headers['authorization'].split(' ')[1];// send the JWT in the request header

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {// if there is a token
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {// error and decoded information from payload
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    next();//to allow execution of  ctrlUser.userProfile on routes
                }
            }
        )
    }
}