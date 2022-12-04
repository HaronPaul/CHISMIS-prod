const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = async (req,res) => {

    const cookies = req.cookies
    if(!cookies?.jwt)  return res.sendStatus(401) 

    const refreshToken = cookies.jwt
    try {
        // Match the enter password with the hashed password
        const foundUser = await User.findOne({refreshToken: refreshToken}, {username: 1, refreshToken: 1, role: 1, firstName: 1, lastName: 1, _id: 1})
        if(!foundUser) return res.sendStatus(403) // Forbidden

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if(err || foundUser.username !== decoded.userInfo.username) return res.sendStatus(403) 
                const accessToken = jwt.sign(
                    {
                        "userInfo" : {
                            "username": decoded.userInfo.username, 
                            "role": decoded.userInfo.role,
                            "firstName": decoded.userInfo.firstName,
                            "lastName": decoded.userInfo.lastName,
                            "id": decoded.userInfo._id
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '30s'}
                )
                res.json({
                    accessToken: accessToken, 
                    role: foundUser.role, 
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,  
                    username: foundUser.username,
                    id: foundUser._id}
                )
            }
        )

    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {handleRefreshToken}  