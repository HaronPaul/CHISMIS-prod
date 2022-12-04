const jwt =  require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req,res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    console.log(authHeader)
    if(!authHeader?.startsWith('Bearer ')) {
        console.log('User is unauthorized')
        return res.sendStatus(401)
    }
    
    const token = authHeader.split(' ')[1]
    console.log(`Token in verify JWT: ${token}`)
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) {
                console.log(err)
                return res.sendStatus(403)
            } // invalid token
            req.user = decoded.userInfo.username
            req.role = decoded.userInfo.role
            next()
        } 
    )
}

module.exports = verifyJWT