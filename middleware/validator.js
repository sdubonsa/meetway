exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("This is an invalid event id!");
        err.status = 400;
        return next(err);
    }
    return next();
}

exports.validateSignUp = (req, res, next) => {
    [
        body("firstName", "Please enter your first name")
            .trim()
            .escape()
            .notEmpty(),
        body("lastName", "Please enter your last name")
            .trim()
            .escape()
            .notEmpty(),
        body("email", "Please enter a valid email address")
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail(),
        body(
            "password",
            "Please enter a password with 8 or more characters, max of 64 characters"
            ).isLength({ min: 8, max: 64 }),
    ];
};

exports.validateLogin = (req, res, next) => {
    [
        body("email", "Please enter a valid email address")
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail(),
        body(
            "password",
            "Please enter a password with 8 or more characters, max of 64 characters"
        ).isLength({ min: 8, max: 64 }),
    ];
};

exports.validateResult = (req, res, next) => {
  let errors = validationResults(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error);
    });
    return res.redirect("back");
  } else {
    return next();
  }
};