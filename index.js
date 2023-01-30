const express = require("express");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/booklist", (req, res) => {
  res.render("list.ejs");
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});
