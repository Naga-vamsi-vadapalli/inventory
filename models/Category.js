const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryid: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  categoryname: { type: String, required: true },
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
