import Product from '../models/product.js';
import mongoose from 'mongoose';

export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(`Error in Get Product ${error.message}`);
    res.status(404).json({ success: false, message: `Its Empty` });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    res.status(400).json({ success: false, message: 'PLease fill in all the fields' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error in Create Product ${error.message}`);
    res.status(500).json({ success: false, message: `Server Error` });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid Product Id' });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error(`Error in Delete Product ${error.message}`);
    res.status(404).json({ success: false, message: `Server Error` });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid Product Id' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(`Error in Update Product ${error.message}`);
    res.status(500).json({ success: false, message: `Server Error` });
  }
};
