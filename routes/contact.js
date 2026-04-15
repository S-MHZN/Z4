const express = require("express");
const path = require("path");
const { handleSendMessage } = require("../controllers/sendMessage");

const router = express.Router();

router.post("/", handleSendMessage);

module.exports = router;
