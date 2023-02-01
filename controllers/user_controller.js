const express = require("express");
const router = express.Router();

const user = require("../model/user_model");

router.get("/new", (req, res) => {
  res.render("user/user_new.ejs");
});

router.post("/", (req, res) => {
  user.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully created User: " + createdUser.username);
      res.redirect("/");
    }
  });
});

module.exports = router;
