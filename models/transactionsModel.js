const mongoose = require("mongoose");
const { itemsSchema } = require("./itemsModel");

const txnSchema = mongoose.Schema({
    customerName: {type: String, required: true},
    customerPhone: {type : String, required: true},
    totalAmount: {type: Number, required: true},
    tax: {type: Number, required: true},
    subTotal : {type : Number, required: true},
    paymentMode : {type: String, required: true},
    cartItems : {type: Array, required : true}
}, {timestamps : true})

const txnModel = mongoose.model('pos-txns', txnSchema)

module.exports = txnModel