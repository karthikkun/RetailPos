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

module.exports = router