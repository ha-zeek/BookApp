const express = require("express");
const router = express.Router();

const book = require("../model/book_schema.js");

// router.get("/", (req, res) => {
//   res.redirect("/books");
// });

// to load new/add books form
router.get("/new", (req, res) => {
  res.render("new.ejs", { currentUser: req.session.currentUser });
});

// to create the new books
router.post("/", (req, res) => {
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
router.get("/", (req, res) => {
  book.find(
    { userid: req.session.currentUser.username },
    (err, booksDetails) => {
      if (err) {
        console.log(err);
      } else {
        res.render("index.ejs", {
          books: booksDetails,
          currentUser: req.session.currentUser,
        });
      }
    }
  );
});

// DELETE ////////////////////////////////////////////////

router.delete("/:id", (req, res) => {
  book.findByIdAndDelete(req.params.id, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/books");
    }
  });
});

// SEED ROUTES ///////////////////////////////////////////

router.get("/seed", (req, res) => {
  book.insertMany(
    [
      {
        title: "Harry Potter & the Philosopher's Stone",
        author: "JK Rowling",
        genre: "fantasy",
        pages: 200,
        recommended: true,
        userid: "Haziq",
      },
      {
        title: "Harry Potter & Chamber of Secrets",
        author: "JK Rowling",
        genre: "fantasy",
        pages: 200,
        recommended: true,
        userid: "Haziq",
      },
      {
        title: "Harry Potter & Prisoner of Azkaban",
        author: "JK Rowling",
        genre: "fantasy",
        pages: 200,
        recommended: true,
        userid: "Haziq",
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "self help",
        pages: 300,
        recommended: true,
        userid: "Haziq",
      },
      {
        title: "Percy Jackson & The Lightning Thief",
        author: "Rick Riordan",
        genre: "fantasy",
        pages: 200,
        recommended: true,
        userid: "Haziq",
      },
      {
        title: "Percy Jackson & Sea of Monsters",
        author: "Rick Riordan",
        genre: "fantasy",
        pages: 200,
        recommended: true,
        userid: "Haziq",
      },
      {
        title: "Psychology of Money",
        author: "Morgan Housel",
        genre: "self help",
        pages: 200,
        recommended: false,
        userid: "Haziq",
      },
    ],
    (err, success) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/books");
      }
    }
  );
});

//////////////////////////////////////////////////////////

// showing books details
router.get("/:id", (req, res) => {
  book.findById(req.params.id, (err, foundBook) => {
    if (err) {
      console.log(err);
    } else {
      res.render("view.ejs", {
        book: foundBook,
        // currentUser: req.session.currentUser,
      });
    }
  });
});

// EDIT
router.get("/:id/edit", (req, res) => {
  book.findById(req.params.id, (err, foundBook) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit.ejs", { book: foundBook });
    }
  });
});

// UPDATE BOOK DETAILS/INFO

router.put("/:id", (req, res) => {
  req.body.recommended = req.body.recommended === "on";
  book.findByIdAndUpdate(req.params.id, req.body, (err, updatedBook) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/books");
    }
  });
});

module.exports = router;
