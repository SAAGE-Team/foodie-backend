var Order = require('../Models/orders.model')

exports.createOrder = async (req,res) => {
    try {

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

    }
    catch(err) {'
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