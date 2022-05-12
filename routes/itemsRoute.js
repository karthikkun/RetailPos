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

router.post('/edit-item', async (req, res) => {
    try {
        await itemsModel.findOneAndUpdate({_id : req.body._id}, req.body)
        res.send('item updated successfully')
    } catch (error) {
        console.log(req)
        res.status(400).json(error)
    }
})

router.post('/delete-item', async (req, res) => {
    try {
        await itemsModel.findOneAndDelete({_id : req.body._id})
        res.send('item deleted successfully')
    } catch (error) {
        console.log(req)
        res.status(400).json(error)
    }
})

module.exports = router