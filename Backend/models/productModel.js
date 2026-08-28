const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      unique: true,
      match: [/^[a-zA-Z0-9\s\-]+$/, 'Product name can only contain letters, numbers, spaces, and hyphens'],
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: [true, 'Category of Product should be Defined'],
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      default: 0,
    },

    image: {
      type: String,
      trim: true,
      default: '',
    },

    description: {
      type: String,
      trim: true,
      maxLength: [1000, 'Length of Description cannot be more than 1000 characters'],
    },

    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity of product cannot be negative'],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('products', productSchema);