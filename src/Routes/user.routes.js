const express = require('express')
<<<<<<< HEAD
const { Register, UpdateUser, DeleteUser, GetAUser, Login, GetAllUser } = require('../Controllers/user.controller')
=======
const { Register, UpdateUser, DeleteUser, GetAUser } = require('../Controllers/user.controller')
>>>>>>> e5acdbc (user crud)

const router = express.Router()

router
.route('/register')
.post(Register)

router
.route('/allusers')
<<<<<<< HEAD
.get(GetAllUser)

router
.route('/Login')
.post(Login)
=======
.get()

>>>>>>> e5acdbc (user crud)

router
.route('/:id')
.put(UpdateUser)
.delete(DeleteUser)
.get(GetAUser)
module.exports = router