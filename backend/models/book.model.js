const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true, required: true },
  genre: String,
  price: { type: Number, required: true },
  description: String,
  coverImage: String, // You might store a URL or file path
  publicationDate: Date,
  stockQuantity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;