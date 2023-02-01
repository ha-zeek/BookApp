const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  recommended: Boolean,
});

const book = mongoose.model("book", bookSchema);
module.exports = book;
