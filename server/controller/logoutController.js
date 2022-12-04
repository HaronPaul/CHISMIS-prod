const handleLogout = async (req,res) => {
    // On client, also delete the access token
    const cookies = req.cookies
    if(!cookies?.jwt)  return res.sendStatus(204) // No content : ;

    const refreshToken = cookies.jwt

    // Is refresh token in DB
    try {
        // Match the enter password with the hashed password
        const foundUser = await User.findOne({refreshToken: refreshToken}, {username: 1, refreshToken: 1})

        // If user is not found in DB and cookie has token, then clear the jwt token in the cookie
        if(!foundUser) {
            res.clearCookie('jwt', {httpOnly: true})
            return res.sendStatus(204) // Forbidden
        }
        
        // If user is found, delete the token of the user/ update to null
        // Delete the refresh token in the database
        await User.updateOne({username: foundUser.username}, {refreshToken: ''})

        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}) // Secure: true - only serves on https
        res.sendStatus(204)

    } catch(err) {
        res.sendStatus(500)
    }
}

module.exports = {handleLogout}  