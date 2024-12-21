const mongoose = require('mongoose');
const Category = require("./Category")
const itemSchema = new mongoose.Schema({
  itemid: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  categoryid: { type: Number,
    required: true,},
  price: { type: Number, required: true },
  quality: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;