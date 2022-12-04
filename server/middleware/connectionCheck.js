const mongoose = require('mongoose')

function checkConnection(req,res,next){
    if(mongoose.connection.readyState === 1){
        next()
    }else if(mongoose.connection.readyState === 2){
        return res.json({
            success: false, 
            message: 'Database Still Connecting 😉😉'
        })
    } else {
        return res.json({
            success: false, 
            message: 'Database Connection Error 😭😭😭'
        })
    }
}

module.exports = checkConnection