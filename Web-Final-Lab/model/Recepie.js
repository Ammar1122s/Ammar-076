const mongoose = require("mongoose");

let recepieSchema = mongoose.Schema({
    title:String,
    content:String,
    ingredients:String
})

let Model = mongoose.model("Recepie",recepieSchema);

module.exports = Model;