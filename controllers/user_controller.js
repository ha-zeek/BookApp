const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const user = require("../model/user_model");

router.get("/new", (req, res) => {
  res.render("user_new.ejs");
});

router.post("/", (req, res) => {
  const randomSaltSync = Math.floor(Math.random() * 10) + 1;
  // password encryption
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(randomSaltSync)
  );
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
