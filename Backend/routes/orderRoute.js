const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const { authenticateUser } = require('../middleware/authenticate');

// 1. Create Order (Place Order)
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Save order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    // Clear cart after placing order
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], totalPrice: 0 });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Get Logged-in User's Orders
router.get('/myorders', authenticateUser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Get Single Order Details by ID
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;