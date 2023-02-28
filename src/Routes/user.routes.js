const express = require('express')
const { Register, UpdateUser, DeleteUser, GetAUser, Login, GetAllUser } = require('../Controllers/user.controller')

const router = express.Router()

router
.route('/register')
.post(Register)

router
.route('/allusers')
.get(GetAllUser)

router
.route('/Login')
.post(Login)

router
.route('/:id')
.put(UpdateUser)
.delete(DeleteUser)
.get(GetAUser)
module.exports = router