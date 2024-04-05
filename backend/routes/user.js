const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/getUser", userController.getUser);
router.get("/getUserState", userController.getUserState);

module.exports = router;
