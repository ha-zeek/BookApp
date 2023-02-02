const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  pages: { type: Number, required: true },
  recommended: Boolean,
  userid: { type: String, required: true },
});

const book = mongoose.model("book", bookSchema);
module.exports = book;
