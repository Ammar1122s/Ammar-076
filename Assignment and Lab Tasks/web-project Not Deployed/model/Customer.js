const mongoose = require("mongoose");

let customerSchema = mongoose.Schema({
    name:String,
    email:String,
    number:String
})

let Model = mongoose.model("Customer",customerSchema);

module.exports = Model;