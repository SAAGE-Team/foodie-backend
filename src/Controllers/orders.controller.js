var Order = require('../Models/orders.model')

exports.createOrder = async (req,res) => {
    try {
        var order = await Order.create(req.body)
        if(order) {
            res.status(201).json({
                success: true,
                data: order
            })
        }
        res.status(400).json({
            success: false,
            data: "Failed to create a new order"
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            data: err.message
        })
    }
}

exports.updateOrder = async (req,res) => {
    try {
        var order = await Order.findByIdAndUpdate(req.params.id)
        if(!order) { 
            res.status(400).json({
                success: false,
                data: "Failed to update order"
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            data: err.message
        })
    }
}

exports.deleteOrder = async (req,res) => {
    try {

    }
    catch(err) {
        res.status(500).json({
            success: false,
            data: err.message
        })
    }
}