const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.get("/profile", authMiddleware, async (req, res) => {
    res.json(req.user); // Returns user data excluding password
});

module.exports = router;
