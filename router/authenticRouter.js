const express = require('express');
const Router = express.Router();

// import controller
const authenticController = require('../controller/authenticController')

// import middleware
const jwtVerify = require('../middleware/JWT')

Router.post('/register', authenticController.register)
Router.post('/login', authenticController.login)
Router.get('/check-user-login', jwtVerify, authenticController.checkUserLogin)

module.exports = Router