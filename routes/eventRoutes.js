const express = require("express");
const controller = require("../controllers/eventController");

const router = express.Router();

// 1. GET /stories: Send all stories to the user
router.get("/", controller.index);

// 2. GET /stories/new: Send HTML form
router.get("/new", controller.new);

// 4. GET BY SEPCIF ID
router.get("/:id", controller.show);

module.exports = router;
