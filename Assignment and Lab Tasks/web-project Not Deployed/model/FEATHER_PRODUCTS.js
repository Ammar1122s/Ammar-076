const mongoose = require("mongoose");

let productsSchema = mongoose.Schema({
    name:String,
    price:Number,
    Details:String,
    path:String
})

let Model = mongoose.model("Feather-product",productsSchema);

module.exports = Model;