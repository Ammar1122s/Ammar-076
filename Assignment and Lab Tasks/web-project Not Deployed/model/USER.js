const mongoose = require("mongoose");

let customerSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:[]
})

let Model = mongoose.model("User",customerSchema);

module.exports = Model;