const express = require('express')
const { Register, UpdateUser, DeleteUser, GetAUser, Login, GetAllUser, VerifyEmail } = require('../Controllers/user.controller')
const {verifyToken,verifyTokenAndAuthorisation,verifyTokenAndAdmin} = require('../Middleware/user.auth')

const router = express.Router()

router
.route('/register')
.post(Register)

router
.route(verifyTokenAndAdmin,'/allusers')
.get(GetAllUser)

router
.route('/verify_email')
.post(VerifyEmail)

router
.route('/Login')
.post(Login)

router
.route('/:id')
.put(verifyTokenAndAuthorisation,UpdateUser)
.delete(verifyTokenAndAuthorisation,DeleteUser)
.get(verifyToken,GetAUser)
module.exports = router