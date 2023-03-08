const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { json } = require('express')
const connectDB = require('./src/config/db')
// load env variables 
dotenv.config()


// connect to database 
connectDB()


// routes file

const User = require('./src/Routes/user.routes')

const Products = require('./src/Routes/product.routes')

const Orders = require('./src/Routes/orders.routes')

// init.. app
const app = express()
app.use(cors())
app.use(json())

// users testing
app.use('/api/user',User)

//products testing
app.use('/api/products',Products)

//orders testing
app.use('/api/orders', Orders)

// setting port

const PORT = process.env.PORT || 5000
app.listen(PORT , console.log(`server listening on port ${PORT}...`))