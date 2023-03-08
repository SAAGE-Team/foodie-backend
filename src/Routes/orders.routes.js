var express = require('express')
var { createOrder,  deleteOrder, updateOrder } = require('../Controllers/orders.controller')

var router = express.Router();

router.post('/createOrder', createOrder)

router.put('/updateOrder/:id', updateOrder)

router.delete('/deleteOrder/:id', deleteOrder)

module.exports = router