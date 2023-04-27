const model = require("../models/event");
const rsvpModel = require("../models/rsvp");
const userModel = require("../models/user");

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds

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
    .catch((err) => next(err));
};

// 2. GET /events/new: HTML form for creating a new event
exports.new = (req, res) => {
  res.render("./event/newEvent");
};

// 3. POST /events: Create a event story
exports.create = (req, res, next) => {
  let event = new model(req.body); //create a new event document
  event.host = req.session.user; //add the author to the event document

  let imagePath = "/images/" + req.file.filename;

  event.image = imagePath;

  event
    .save() //insert the document to the database
    .then((event) => {
      event.image = imagePath;
      // create successfull flash message
      req.flash("success", "Event created successfully");
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

  model
    .findById(id)
    .populate("host", "firstName lastName")
    .then((event) => {
      if (event) {
        let start = event.starttime.toLocaleDateString("en-US", options);
        let end = event.endtime.toLocaleDateString("en-US", options);
        // number of rsvps for this event
        rsvpModel
          .find({ event: id })
          .then((rsvps) => {
            let count = rsvps.length;
            // has the user already rsvp'd for this event?
            let rsvp = rsvps.find((rsvp) => rsvp.user == req.session.user);
            res.render("./event/event", { event, start, end, count, rsvp });
          })
          .catch((err) => next(err));
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

  model
    .findById(id)
    .then((event) => {
      if (event) {
        // convert date to local datetime
        let start = new Date(event.starttime - tzoffset)
          .toISOString()
          .slice(0, -1);
        let end = new Date(event.endtime - tzoffset).toISOString().slice(0, -1);
        res.render("./event/edit", { event, start, end });
      } else {
        let err = new Error("Cannot find a event with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));
};

// 6. PUT /stories/:id: Update event by ID
exports.update = (req, res, next) => {
  let id = req.params.id;
  let event = req.body; //create a new event document

  model
    .findByIdAndUpdate(id, event, {
      useFindAndModify: false,
      runValidators: true,
    })
    .then((event) => {
      if (event) {
        req.flash("success", "Event edited successfully");
        res.redirect("/events/" + id);
      } else {
        let err = new Error("Cannot find a event with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};

// 7.  DELETE /stories/:id: Delete event by ID
exports.delete = (req, res, next) => {
  let id = req.params.id;

  model
    .findByIdAndDelete(id, { useFindAndModify: false })
    .then((event) => {
      if (event) {
        // delete all rsvps associated with this event
        rsvpModel
          .deleteMany({ event: id })
          .then((rsvps) => {
            // create successfull flash message
            req.flash("success", "Event and RSVPs deleted successfully");
            res.redirect("/events");
          })
          .catch((err) => next(err));
      } else {
        let err = new Error("Cannot find a event with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));
};

function findByCategory(events, category) {
  return events.filter((event) => event.category === category);
}

// 8. POST /events/:id/rsvp: Create a rsvp for an event
exports.rsvp = (req, res, next) => {
  let event = req.params.id;
  let user = req.session.user;
  let rsvpStat = req.body;

  let rsvp = new rsvpModel({
    event: event,
    user: user,
    status: rsvpStat.rsvp,
  }); //create a new rsvp document

  rsvp
    .save() //insert the document to the database
    .then((rsvp) => {
      // create successfull flash message
      req.flash("success", "RSVP created successfully");
      res.redirect("/events");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};

exports.updateRsvp = (req, res, next) => {
  let event = req.params.id;
  let user = req.session.user;
  let rsvpStat = req.body;

  // check if user has already rsvp'd and update status
  rsvpModel
    .findOneAndUpdate({ event: event, user: user }, { status: rsvpStat.rsvp }, {
      useFindAndModify: false,
      runValidators: true,
    })
    .then((rsvp) => {
      if (rsvp) {
        req.flash("success", "RSVP updated successfully");
        res.redirect("/events");
      }
    })
    .catch((err) => next(err));
};
