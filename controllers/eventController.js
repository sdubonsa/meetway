const model = require("../models/event");

// 1. GET /events: Send all events to the user
exports.index = (req, res) => {
  res.render("./event/events", {
    events: model.find(),
    workshops: model.findByCategory("workshop"),
    meetups: model.findByCategory("meetup"),
    fairs: model.findByCategory("careerfair"),
    headshots: model.findByCategory("headshot"),
    other: model.findByCategory("other"),
  });
};

// 2. GET /events/new: HTML form for creating a new event
exports.new = (req, res) => {
  res.render("./event/newEvent");
};

// 3. POST /events: Create a event story
exports.create = (req, res) => {
  let event = req.body;

  model.save(event);
  res.redirect("/events");
};

// 4. GET /stories/:id Send event with specific id
exports.show = (req, res, next) => {
  let id = req.params.id;
  let event = model.findById(id);

  if (event) {
    res.render("./event/event", { event: event });
  } else {
    let err = new Error("Cannot find a event with id " + id);
    err.status = 404;
    next(err);
  }
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