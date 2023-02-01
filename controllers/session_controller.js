const express = require("express");
const user = require("../model/user_model");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("sessions/sessions_new.ejs");
});

router.post("/", (req, res) => {
  user.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (req.body.password === foundUser.password) {
        req.session.currentUser = foundUser;
        res.redirect("/books");
      } else {
        res.send("Invalid User Name or Password");
      }
    }
  });
});

// delete session // LOGOUT
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
