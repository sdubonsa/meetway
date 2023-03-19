const model = require("../models/event");

// 1. GET /events: Send all events to the user
exports.index = (req, res) => {
  model
    .find()
    .then((events) =>
      res.render("./event/events", {
        events,
        workshops: findByCategory(events, "workshop"),
        meetups: findByCategory(events, "meetup"),
        fairs: findByCategory(events, "careerfair"),
        headshots: findByCategory(events, "headshot"),
        other: findByCategory(events, "other"),
      })
    )
    .catch((err) => console.log(err));
};

// 2. GET /events/new: HTML form for creating a new event
exports.new = (req, res) => {
  res.render("./event/newEvent");
};

// 3. POST /events: Create a event story
exports.create = (req, res, next) => {
  let event = new model(req.body); //create a new event document

  let start = new Date(req.body.starttime);
  let end = new Date(req.body.endtime);
  let imagePath = "/images/" + req.file.filename;

  event.image = imagePath;
  event.starttime = start;
  event.endttime = end;

  event
    .save() //insert the document to the database
    .then((event) => {
      event.image = imagePath;
      res.redirect("/events");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};

// 4. GET /stories/:id Send event with specific id
exports.show = (req, res, next) => {
  let id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid event id");
    err.status = 400;
    return next(err);
  }

  model
    .findById(id)
    .then((event) => {
      if (event) {
        let start = event.starttime.toLocaleString("en-GB", {
          timeZone: "UTC",
        });
        let end = event.endttime.toLocaleString("en-GB", { timeZone: "UTC" });
        res.render("./event/show", { event, start: start, end: end });
      } else {
        let err = new Error("Cannot find a event with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));
};


// 5. GET /stories/:id/edit: Send HTML form for editing story
exports.edit = (req, res, next) => {
  let id = req.params.id;
  let event = model.findById(id);

  if (event) {
    res.render("./event/edit", { event: event });
  } else {
    let err = new Error("Cannot find a event with id " + id);
    err.status = 404;
    next(err);
  }
};

// 6. PUT /stories/:id: Update event by ID
exports.update = (req, res, next) => {
  let event = req.body;
  let id = req.params.id;

  if (model.updateById(id, event)) {
    res.redirect("/events/" + id);
  } else {
    let err = new Error("Cannot find a event with id " + id);
    err.status = 404;
    next(err);
  }
};

// 7.  DELETE /stories/:id: Delete event by ID
exports.delete = (req, res, next) => {
  let id = req.params.id;
  if (model.deleteById(id)) {
    res.redirect("/events");
  } else {
    let err = new Error("Cannot find a event with id " + id);
    err.status = 404;
    next(err);
  }
};

function findByCategory(events, category) {
  return events.filter((event) => event.category === category);
};