const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    empId: {type: String, required: true},
    password: {type: String, required: true},
    verified : {type : Boolean, required: true}
}, {timestamps : true})

const userModel = mongoose.model('pos-users', userSchema)

module.exports = userModel