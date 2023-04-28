const { body } = require("express-validator");
const { validationResult } = require("express-validator");

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("This is an invalid event id!");
        err.status = 400;
        return next(err);
    }
    return next();
}

exports.validateSignUp =
    [
        body("firstName", "Please enter your first name").notEmpty().trim().escape(),
        body("lastName", "Please enter your last name").notEmpty().trim().escape(),
        body("email", "Please enter a valid email address").isEmail().trim().escape().normalizeEmail(),
        body("password","Please enter a password with 8 or more characters, max of 64 characters").isLength({ min: 8, max: 64 }),
    ];

exports.validateLogin =
    [
        body("email", "Please enter a valid email address").isEmail().trim().escape().normalizeEmail(),
        body("password","Please enter a password with 8 or more characters, max of 64 characters").isLength({ min: 8, max: 64 }),
    ];

exports.validateEvent = 
    [
        body("title", "Please enter a title for the event").trim().escape().notEmpty(),
        body("category", "Please select a category for the event").trim().escape().notEmpty().isIn(["workshop", "meetup", "careerfair", "headshot", "other"]),
        body("details", "Please enter details for the event. Must be atleast 10 characters.").trim().escape().isLength({ min: 10 }),
        body("location", "Please enter a location for the event").trim().escape().notEmpty(),
        body("starttime", "Please enter a valid start time for the event. Must start after today.").trim().escape().notEmpty().isISO8601().isAfter(new Date().toISOString()),
        body("endtime", "Please enter an end time for the event").trim().escape().notEmpty().isISO8601(),
    ];

exports.validateResult = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    return res.redirect("back");
  } else {
    return next();
  }
};

// create a method to compare the start time and end time
exports.compareTime = (req, res, next) => {
    let starttime = req.body.starttime;
    let endtime = req.body.endtime;
    if (starttime > endtime) {
        req.flash("error", "Start time cannot be later than end time");
        return res.redirect("back");
    } else {
        return next();
    }
};

exports.validateRsvp =
    [
        body("rsvp", "Please enter a valid status").trim().escape().notEmpty().isIn(["yes", "no", "maybe"]),
    ];
        