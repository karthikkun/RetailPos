const express = require("express");
const router = express.Router()
const itemsModel = require('../models/itemsModel')

router.get('/get-all-items', async (req, res) => {
    try {
        const items = await itemsModel.find({})
        res.send(items)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/add-item', async (req, res) => {
    try {
        const newItem = new itemsModel(req.body)
        await newItem.save({ validateBeforeSave: false })
        res.send('new item has been added successfully')
    } catch (error) {
        console.log(req)
        res.status(400).json(error)
    }
})

module.exports = router