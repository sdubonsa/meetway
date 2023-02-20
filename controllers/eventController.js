const model = require("../models/event");

// 1. GET /events: Send all events to the user
exports.index = (req, res) => {
  res.render("./events");
};

// GET /events/new: HTML form for creating a new event
exports.new = (req, res) => {
  res.render("./newEvent");
};
