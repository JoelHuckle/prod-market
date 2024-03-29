const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const logger = require("morgan");
const passport = require("passport");
const flash = require("flash");
require("dotenv").config({ path: "./config/.env" });

// cors setup
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Configure session middleware
app.use(
  session({
    secret: "3percsthatsit",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport config
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

connectDB();

//accept forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setup Routes For Which The Server Is Listening
// app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/auth", authRoutes);
// app.use("/service", commentRoutes);

app.use(logger("dev"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
