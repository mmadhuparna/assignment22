const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Product Schema
const ProductSchema = new Schema({
  _id:{
    type: Number
  },
  pname: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports  = mongoose.model("products", ProductSchema);