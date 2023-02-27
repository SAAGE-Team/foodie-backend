const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { json } = require('express')


// routes file
const User = require('./src/Routes/user.routes')


// load env variables 
dotenv.config()

// init.. app
const app = express()
app.use(cors())
app.use(json())

app.use('api/users/',User)

// setting port

const PORT = process.env.PORT || 5000
app.listen(PORT , console.log(`server listening on port ${PORT}...`))