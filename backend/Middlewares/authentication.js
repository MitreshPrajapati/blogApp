
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRETKEY = process.env.SECRETKEY || 'Jawlia'

const authentication = (req, res, next) => {
    const token = req.headers?.authentication?.split(" ")[1]
    try {
        if (token) {
            var decoded = jwt.verify(token,SECRETKEY);
            // req.body.email = decoded.email
            req.body.userId = decoded.userId
            next()
        } else {
            res.send("User not authenticated.")
        }
    }
    catch (err) {
        res.send({message: err})
    }
}

module.exports = { authentication };