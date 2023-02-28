const express = require('express')

var { RegisterProduct, CheckProductAvailability, GetProducts , DeleteProduct} = require("../Controllers/product.controller")

var router = express.Router();

router.route('/registerproduct').post(RegisterProduct)

router.route('/getallproducts').get(GetProducts)

router.route('/products:id')
.get(CheckProductAvailability)
.delete(DeleteProduct)