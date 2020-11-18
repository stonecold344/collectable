const jwt = require('jsonwebtoken')
const { jwtSecret, jwtExpire } = require('../config/keys')
exports.authenticateJWT = (req, res, next) => {
    const token = req.cookies.token
    if (!token){
        return res.status(401).json({
            errorMessage: 'No token! Authorization denied!',
        })
    }
    try {
        console.log(jwtExpire)
        const decoded = jwt.verify(JSON.parse(token), jwtSecret)
        req.user = decoded.user
        next()
    } catch(err) {
        console.log('Jwt error: ', err)
        res.status(401).json({
            errorMessage: 'Invalid token!'
        })
    }
}