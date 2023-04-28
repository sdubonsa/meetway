const express = require("express");
const controller = require("../controllers/eventController");
const { fileUpload } = require("../middleware/fileUpload");
const { isLoggedIn, isAuthor, isNotAuthor } = require("../middleware/auth");
const { validateEvent, validateResult, validateId, compareTime, validateRsvp } = require("../middleware/validator");

const router = express.Router();

// 1. GET /stories: Send all stories to the user
router.get("/", controller.index);

// 2. GET /stories/new: Send HTML form
router.get("/new", isLoggedIn, controller.new);

// 3. POST /stories: Create a new story
router.post("/", isLoggedIn, fileUpload, compareTime, validateEvent, validateResult, controller.create);

// 4. GET BY SEPCIF ID
router.get("/:id", validateId, controller.show);

// 5. GET /stories/:id/edit: Send HTML form for editing story
router.get(
  "/:id/edit",
  validateId,
  isLoggedIn,
  isAuthor,
  fileUpload,
  controller.edit
);

// 6. PUT /stories/:id: Update story by ID
router.put("/:id", validateId, isLoggedIn, isAuthor, controller.update);

// 7.  DELETE /stories/:id: Delete story by ID
router.delete("/:id", validateId, isLoggedIn, isAuthor, controller.delete);

// 8. RSVP
router.post("/:id/rsvp", validateId, isLoggedIn, isNotAuthor, validateRsvp, validateResult, controller.rsvp);

// 9. Update RSVP
router.put("/:id/rsvp", validateId, isLoggedIn, isNotAuthor, validateRsvp, validateResult, controller.updateRsvp);

module.exports = router;
