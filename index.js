const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

require("dotenv").config();
const app = express();

app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

////////////////// MONGOOSE/MONGO DB ACTIVITIES
const mongoUri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST_NAME}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(mongoUri, { useNewUrlParser: true }, () => {
  console.log(
    "Establishing connection with Mongo DB: " + process.env.MONGO_DB_NAME
  );
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Successfully established connection");
});

db.on("error", (err) => {
  console.log("Unable to establish connection: " + err.message);
});

db.on("disconnected", () => {
  console.log("Disconnected from Mongo DB");
});

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// const books = require("./model/books.js");
const book = require("./model/book_schema.js");

app.get("/", (req, res) => {
  res.redirect("/books");
});

// to load new/add books form
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});

// to create the new books
app.post("/books", (req, res) => {
  if (req.body.recommended === "on") {
    req.body.recommended = true;
  } else {
    req.body.recommended = false;
  }
  // inserting books details into Mongo DB
  book.create(req.body, (err, createdBook) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/books");
    }
  });
});

// routes for index books
app.get("/books", (req, res) => {
  book.find({}, (err, booksDetails) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index.ejs", { books: booksDetails });
    }
  });
});

app.get("/books/:id", (req, res) => {
  book.findById(req.params.id, (err, foundBook) => {
    if (err) {
      console.log(err);
    } else {
      // res.send(foundBook);
      res.render("view.ejs", { book: foundBook });
    }
  });
});

app.listen(port, () => {
  console.log("App is listening on port: " + port);
});
