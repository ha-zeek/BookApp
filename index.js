const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");

require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public")); // initialize public folder as static

// SESSION SECRET MIDDLEWARE //
app.use(
  session({
    secret: "somerandomstring",
    resave: false,
    saveUninitialized: false,
  })
);

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

// IMPORT CONTROLLER //
const bookController = require("./controllers/book_controller.js");
const userController = require("./controllers/user_controller.js");
const sessionController = require("./controllers/session_controller.js");

app.use("/books", bookController);
app.use("/user", userController);
app.use("/sessions", sessionController);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser,
  });
});

app.listen(port, () => {
  console.log("App is listening on port: " + port);
});
