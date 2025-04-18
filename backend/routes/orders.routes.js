const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Book = require('../models/book.model'); // To potentially update stock

// GET all orders (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username email').populate('items.bookId', 'title author');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'username email').populate('items.bookId', 'title author');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET orders for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.bookId', 'title author');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  const { userId, items, shippingAddress, billingAddress } = req.body;

  try {
    // Fetch book details to calculate total amount and potentially update stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        return res.status(404).json({ message: `Book not found with ID: ${item.bookId}` });
      }
      if (book.stockQuantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for book: ${book.title}` });
      }
      totalAmount += book.price * item.quantity;
      orderItems.push({
        bookId: item.bookId,
        quantity: item.quantity,
        priceAtPurchase: book.price,
      });
      // Optionally update book stock (consider atomicity in a real-world scenario)
      await Book.findByIdAndUpdate(item.bookId, { $inc: { stockQuantity: -item.quantity } });
    }

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      billingAddress,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an existing order by ID (consider what can be updated)
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an order by ID (consider implications, e.g., restocking)
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // Optionally, you might want to increase the stock of the books in the deleted order
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;