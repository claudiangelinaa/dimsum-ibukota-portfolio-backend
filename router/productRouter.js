const express = require('express');
const Router = express.Router();

// import controller
const productController = require('../controller/productController')

// import middleware
const jwtVerify = require('../middleware/JWT')

Router.post('/add-product', jwtVerify, productController.addProduct)
Router.get('/get-all-products', jwtVerify, productController.getAllProducts)
Router.patch('/edit-product/:idProduct', jwtVerify, productController.editProduct)
Router.delete('/delete-product/:idProduct', jwtVerify, productController.deleteProduct)

module.exports = Router