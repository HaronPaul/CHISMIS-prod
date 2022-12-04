const express = require('express')
const dotenv = require('dotenv')    
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const corsOptions = require('./config/corsOptions')

// Route files
const user = require('./routes/user')
const shiftReport = require('./routes/shiftReport')
const weeklyReport = require('./routes/weeklyReport')
const inventory = require('./routes/inventory')
const attendance = require('./routes/atttendance')
const auth = require('./routes/auth')
const refresh = require('./routes/refresh')
const logout = require('./routes/logout')
const credentials = require('./middleware/credentials')

// Load env vars
dotenv.config({path: './config/config.env'})

connectDB()
const app = express()
const PORT = process.env.PORT || 8000

// Middlewares
// Cross Origin Resource Sharing 

app.use(credentials)
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.set('query parser', function(qs, options) {
    
})

// Middleware for cookies
app.use(cookieParser())


// Mount routers
app.use('/api/v1/user', user)
app.use('/api/v1/shift_report', shiftReport)
app.use('/api/v1/weekly_report', weeklyReport)
app.use('/api/v1/inventory', inventory)
app.use('/api/v1/attendance', attendance)
app.use('/api/v1/auth', auth)
app.use('/api/v1/refresh', refresh)
app.use('/api/v1/logout', logout)


app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} listening to Port ${PORT}`)
})