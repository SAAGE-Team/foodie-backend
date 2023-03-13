const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { json } = require('express')
const connectDB = require('./src/config/db')
const logRequests = require('./src/Middleware/logRequests');
const logger = require('./src/Middleware/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('./swagger.json');




// load env variables 
dotenv.config()

// connect to database 
connectDB()


// routes file
const User = require('./src/Routes/user.routes')
const stripeRoute = require('./src/Routes/stripe')

// init.. app
const app = express()
app.use(cors())
app.use(json())
// app.use(logRequests); // use the logRequests middleware for all routes
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
  
  

app.use('/api/user',User)
app.use('/api/checkout' , stripeRoute)


// setting port

const PORT = process.env.PORT || 5000
app.listen(PORT , console.log(`server listening on port ${PORT}...`))