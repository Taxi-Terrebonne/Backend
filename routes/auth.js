//to code for the admin login
const express = require("express");
const router = express.Router();
const { login_get, login_auth, signup_auth } = require("../controllers/auth");
const { protect } = require("../middleware/auth")


// routes for signup....
router.post("/signup", signup_auth);

//routes for login......

router.post("/login", login_auth);
router.get("/login", protect, login_get);

module.exports = router;