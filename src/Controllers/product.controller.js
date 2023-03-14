const Products = require('../Models/product.model')

exports.RegisterProduct = async(req,res) => {
    try {
        var product = Products.create(req.body);
        res.status(201).json({
            success: true,
            data: product
        })
        console.log(product)
    }
    catch(error) {
        res.status(400).send("Server Error!")
    }
}

exports.CheckProductAvailability = async(req,res) => {
    try {
        var data = req.params;
        if(data) {
            var product = await Products.findOne({name: data.id })
            if(!product) {
                return res.status(401)
                .json({
                    success: false,
                    message: "Product not found"
                })
            }

            res.status(200)
            .json({
                success: true,
                data: product
            })
        }
    }
    catch(err) {
        res.send(500).send("Server Error!")
    }
}

exports.GetAllProducts = async(req,res) => {
    try {
        const products = await Products.find()
        if(!products) {
            return res.status(400)
            .json({
                success: false,
                data: "No products found!"
            })
        }

        res.send(200).json({
            success: true,
            data: products
        })
    }
    catch(err) {
        res.send(500).send("Server Error!")
    }
}


exports.DeleteProduct = async(req,res) => {
    try {
        const product = Products.findByIdAndDelete({id:req.params.id})
        if(!product) {
            return res.status(400).json({
                success: false,
                data: "Product not Found"
            })
        }

        res.status(200).json({
            success: true,
            data: "Product deleted successfully"
        })
    }
    catch(err) {
        res.status(500).send("Server Error")
    }
}