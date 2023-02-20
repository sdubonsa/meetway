const express = require("express");
const controller = require("../controllers/eventController");

const router = express.Router();

// 1. GET /stories: Send all stories to the user
router.get("/", controller.index);

router.get("/new", controller.new);

module.exports = router;
