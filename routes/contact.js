const express = require("express");
const path = require("path");
const { handleSendMessage } = require("../controllers/sendMessage");

const router = express.Router();

router.post("/", handleSendMessage);
//Test route to check if the contact route is working
module.exports = router;
