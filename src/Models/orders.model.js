var mongoose = require('mongoose')

var orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userId : {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

var orderModel = mongoose.model('Orders', orderSchema)

module.exports = orderModel;