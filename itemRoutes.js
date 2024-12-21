const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Items');
const Category = require('./models/Category');

const router = express.Router();

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

router.post('/items', async (req, res) => {
  try {
    const { itemid, name, categoryid, price, quality } = req.body;

    // Check if category exists, else create a new one
    let category = await Category.findById(categoryid);
    if (!category) {
      // If category doesn't exist, create a new category
      category = new Category({
        name: `New Category for ${name}`, // Default category name, customize as needed
      });
      await category.save(); // Save new category to database
    }

    // Create the new item with the found or created category
    const newItem = new Item({
      itemid,
      name,
      categoryid: category._id, // Use the category's _id for the new item
      price,
      quality,
    });

    await newItem.save(); // Save the item to the database
    res.status(201).json(newItem); // Respond with the new item
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});



router.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryid, price, quality } = req.body;

    if (categoryid) {
      const category = await Category.findById(categoryid);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, categoryid, price, quality },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
