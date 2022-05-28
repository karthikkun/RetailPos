const express = require('express')
const router = express.Router();
const TransactionsModel = require('../models/transactionsModel')

router.post("/charge-txn", async (req, res) => {
    try {
        const newTxn = new TransactionsModel(req.body)
        await newTxn.save()
        res.send("Transaction charged successfully")
    }
    catch (error){
        res.status(400).json(error);
        console.log(error)
    }
})

router.get("/get-all-txns", async (req, res) => {
    try {
        const txns = await TransactionsModel.find({})
        res.send(txns)
    }
    catch (error){
        res.status(400).json(error)
        console.log(error)
    }
})

module.exports = router