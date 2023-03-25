const express = require("express");
const controller = require("../controllers/eventController");
const { fileUpload } = require("../middleware/fileUpload");

const router = express.Router();

// 1. GET /stories: Send all stories to the user
router.get("/", controller.index);

// 2. GET /stories/new: Send HTML form
router.get("/new", controller.new);

// 3. POST /stories: Create a new story
router.post("/", fileUpload, controller.create);

// 4. GET BY SEPCIF ID
router.get("/:id", controller.show);

// 5. GET /stories/:id/edit: Send HTML form for editing story
router.get("/:id/edit", fileUpload, controller.edit);

// 6. PUT /stories/:id: Update story by ID
router.put("/:id", controller.update);

// 7.  DELETE /stories/:id: Delete story by ID
router.delete("/:id", controller.delete);

module.exports = router;
