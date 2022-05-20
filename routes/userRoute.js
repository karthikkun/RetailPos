const express = require("express");
const router = express.Router()
const userModel = require('../models/userModel')



router.post('/register', async (req, res) => {
    try {
        const newUser = new userModel({...req.body, verified: false})
        await newUser.save({ validateBeforeSave: true })
        res.send('registeration successfull. Please wait for verification')
    } catch (error) {
        console.log(req)
        res.status(400).json(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({empId : req.body.empId, password : req.body.password, verified : true})
        if(user)
            res.send('login successful')
        else{
            console.log(req)
            res.status(400).json(error)
        }
    } catch (error) {
        console.log(req)
        res.status(400).json(error)
    }
})

module.exports = router