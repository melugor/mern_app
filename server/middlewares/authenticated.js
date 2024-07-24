const jwt = require("jsonwebtoken")

function asureAuth(req, res, next) {
    console.log(req.headers.authorization)
    next()
}

module.exports = {
    asureAuth
}