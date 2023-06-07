const mongoose = require("mongoose");

let ordersSchema = mongoose.Schema({
    name:String,
    product_id:String,
    price:Number,
    path:String,
    orderfor:String
})


let Model = mongoose.model("Order",ordersSchema);


module.exports = Model;