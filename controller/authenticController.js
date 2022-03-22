const validator = require('validator')
const jwt = require('jsonwebtoken')

// import helpers
const hashPassword = require('../helper/hashPassword')

// import connection
const db = require('../connection/Connection')
const express = require('express')

// ########## REGISTER
const register = (req, res) => {
    let data = {
        email: req.body.email,
        password: hashPassword(req.body.password),
        name: req.body.name
    }
    if(!data.email || !data.password || !data.name) throw {message: "All fields must be filled" } 
    console.log(data);
    if(!validator.isEmail(data.email)) throw 'Email format is not valid'

    // cek data di db
    db.query('SELECT * FROM user WHERE email =?', data.email, (err,result) => {
        try {
            if(err) throw err

            if(result.length !== 0){
                res.status(200).send({
                    error: true,
                    message: 'User has been registered'
                })
            }else{
                // register ke db
                db.query('INSERT INTO user SET?', data, (err,result) => {
                    try {
                        if(err) throw err
                        res.status(200).send({
                            error: false,
                            message: "Successfully register data"
                        })
                    } catch (error) {
                        console.log(error);
                        res.status(500).send({
                            error: true,
                            message: 'Error insert data'
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Error find data'
            })
        }
    } )
}

const login = (req,res) => {
    let data = {
        email: req.body.email,
        password: hashPassword(req.body.password)
    }
    console.log('data1', data);
    try {
        if(!data.email || !req.body.password ) throw {message: "All fields must be filled" } 
        console.log('data:',data);
        if(!validator.isEmail(data.email)) throw {message: 'Email format is not valid'}
    } catch (error) {
        res.status(402).send({
            error: true,
            error_message: error.message
        })

        return
    }

    // cek db
    db.query('SELECT * FROM user WHERE email =? and password=?', [data.email, data.password], (err,result) => {
        try {
            if(err) throw err
            if(result.length === 0){
                res.status(200).send({
                    error: false,
                    message: 'Email and password did not match'
                })
            }else{
                jwt.sign({id: result[0].id, email: result[0].email}, '123abc', (err,token) => {
                    try {
                        if(err) throw err

                        res.status(200).send({
                            error: false,
                            message: 'Successfully login', 
                            token: token,
                            user_id: result[0].id,
                            email: result[0].email
                        })
                    } catch (error) {
                        console.log(error);
                        res.status(500).send({
                            error: true,
                            message: 'Failed to login'
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send({
                error: false,
                message: 'Error find data'
            })
        }
    })
}

const checkUserLogin = (req,res) => {
    console.log("dataToken", req.dataToken);
    let dataToken = req.dataToken

    res.status(200).send({
        message: 'Token valid',
        data: dataToken
    })
}

module.exports = {
    register: register,
    login: login,
    checkUserLogin: checkUserLogin
}