const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogin = async (req,res) => {
    console.log('In handle login')
    const {username, password} = req.body
    if(!username && !password) return res.status(400).json({'message': 'Username and password are required'})
    try {
        // Match the enter password with the hashed password
        const foundUser = await User.findOne({username}, {username: 1, password: 1, role: 1, firstName: 1, verified: 1, lastName: 1, _id: 1})
        if(!foundUser) return res.sendStatus(401)
        if(!foundUser.verified) return res.status(401).json({message: 'You are not yet verified'})
        
        // When user is found, check if hashedPassword matches  
        const match = await bcrypt.compare(password, foundUser.password)
        if(match) {
            // Create tokens here and send
            const accessToken = jwt.sign(
                {
                "userInfo": {
                    "username": foundUser.username, 
                    "role": foundUser.role,
                    "firstName": foundUser.firstName,
                    "lastName": foundUser.lastName,
                    "id": foundUser._id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '5s'}
            )
            const refreshToken = jwt.sign(
                {"userInfo": {
                    "username": foundUser.username, 
                    "role": foundUser.role,
                    "firstName": foundUser.firstName,
                    "lastName": foundUser.lastName,
                    "id": foundUser._id
                    }
                },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            )

            // Save the user's refresh token
            await User.updateOne({_id: foundUser._id}, {refreshToken: refreshToken})

            // Set refresh token in a cookie 
            res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', secure: true})
            res.json({accessToken, role: foundUser.role, username: foundUser.username, firstName: foundUser.firstName, lastName: foundUser.lastName})
                
        }  else {
            res.sendStatus(401)
        }

    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {handleLogin}  