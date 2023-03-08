const express = require('express')

var { RegisterProduct, CheckProductAvailability, GetAllProducts , DeleteProduct} = require("../Controllers/product.controller")

var router = express.Router();

router.route('/register').post(RegisterProduct)

router.route('/getallproducts').get(GetAllProducts)

router.route('/products:id')
.get(CheckProductAvailability)
.delete(DeleteProduct)

module.exports = router;