const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/post");

CLIENT_URL = "http://localhost:3000/feed";
FALIURE_URL = "http://localhost:3000/login";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: FALIURE_URL,
  })
);

module.exports = router;
