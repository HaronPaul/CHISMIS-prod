const verifyRole = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req?.role) {
            console.log('No role in request object') 
            return res.sendStatus(401)
        }

        const rolesArray = [...allowedRoles]
        console.log(allowedRoles)   
        console.log(req.role)
        const isAllowed = rolesArray.includes(req.role)

        console.log(`Is allowed? ${isAllowed}`)
        // If the role in the request object is !== the allowedRole set in the parameter,
        // then send a status of Unauthorized (403)
        if(!isAllowed) return res.sendStatus(401)
        next()
    }
}

module.exports = verifyRole