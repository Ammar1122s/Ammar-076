const express = require("express");
let server = express();


server.listen(3000, () => {
    console.log("Server Started, Visit localhost:3000");
  });
  
  const mongoose = require("mongoose");
  
  mongoose
    .connect("mongodb://localhost/Ecommerce-Sit", { useNewUrlParser: true })
    .then(() => console.log("Connected to Mongo ...."))
    .catch((error) => console.log(error.message));