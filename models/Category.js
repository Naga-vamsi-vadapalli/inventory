const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryid: { type:Number, required: true, unique:true },
  categoryname: { type: String, required: true },
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
