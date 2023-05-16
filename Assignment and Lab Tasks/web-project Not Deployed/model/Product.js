const mongoose = require("mongoose");

let productsSchema = mongoose.Schema({
    name:String,
    price:Number,
    Details:String
})

let Model = mongoose.model("Product",productsSchema);

module.exports = Model;