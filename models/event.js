const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");

const events = [];

exports.find = () => events;

exports.findById = (id) => {
  return events.find((event) => event.id === id);
};

exports.findByCategory = (category) => {
  return events.filter((event) => event.category === category);
};

exports.save = (event) => {
  event.id = uuidv4();

  event.starttime = DateTime.fromISO(event.starttime).toLocaleString(DateTime.DATETIME_MED);
  event.endtime = DateTime.fromISO(event.endtime).toLocaleString(DateTime.TIME_SIMPLE);

  events.push(event);
};

exports.updateById = (id, newevent) => {
  let event = events.find((event) => event.id === id);

  if (event) {
    event.title = newevent.title;
    event.details = newevent.details;
    event.location = newevent.location;
    return true;
  } else {
    return false;
  }
};

exports.deleteById = (id) => {
  let index = events.findIndex((event) => event.id === id);

  if (index !== -1) {
    events.splice(index, 1);
    return true;
  } else {
    return false;
  }
};