const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");

const events = [
  {
    id: "1",
    category: "Meet Up",
    title: "Wells Fargo MeetUp",
    hostname: "Wells Fargo",
    starttime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    endtime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    location: "Union???",
    details: "AAAHHHHHH",
  },
];

exports.find = () => events;

exports.findById = (id) => {
  return events.find((event) => event.id === id);
};

exports.save = (event) => {
  event.id = uuidv4();

  event.starttime = DateTime.fromISO(event.starttime).toLocaleString(DateTime.DATETIME_MED);
  event.endtime = DateTime.fromISO(event.endtime).toLocaleString(DateTime.TIME_SIMPLE);

  events.push(event);
};