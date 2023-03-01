const express = require('express')
const { Register, UpdateUser, DeleteUser, GetAUser, Login, GetAllUser, VerifyEmail } = require('../Controllers/user.controller')

const router = express.Router()

router
.route('/register')
.post(Register)

router
.route('/allusers')
.get(GetAllUser)

router
.route('/verify_email')
.post(VerifyEmail)

router
.route('/Login')
.post(Login)

router
.route('/:id')
.put(UpdateUser)
.delete(DeleteUser)
.get(GetAUser)
module.exports = router