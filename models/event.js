const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");

const events = [
  {
    id: "1",
    title: "Wells Fargo Meetup",
    category: "meetup",
    details: "Come meet with us!",
    location: "Union 203",
    starttime: "2023-02-23T01:30",
    endtime: "2023-02-23T02:30",
    image: "/images/welcome.jpg",
  },
  {
    id: "2",
    title: "Wells Fargo Career Fair",
    category: "careerfair",
    details: "Come meet with us!",
    location: "Union 203",
    starttime: "2023-02-23T01:30",
    endtime: "2023-02-23T02:30",
    image: "/images/welcome.jpg",
  },
  {
    id: "3",
    title: "Coding Workshop",
    category: "workshop",
    details: "Come meet with us!",
    location: "Union 203",
    starttime: "2023-02-23T01:30",
    endtime: "2023-02-23T02:30",
    image: "/images/welcome.jpg",
  },
  {
    id: "4",
    title: "Career Center Headshot",
    category: "headshot",
    details: "Come meet with us!",
    location: "Union 203",
    starttime: "2023-02-23T01:30",
    endtime: "2023-02-23T02:30",
    image: "/images/welcome.jpg",
  },
  {
    id: "5",
    title: "Dog Racing",
    category: "other",
    details: "Come meet with us!",
    location: "Union 203",
    starttime: "2023-02-23T01:30",
    endtime: "2023-02-23T02:30",
    image: "/images/welcome.jpg",
  },
  {
    id: "6",
    title: "Monkey Career Fair",
    category: "careerfair",
    details: "Come meet with us!",
    location: "Union 203",
    starttime: "2023-02-23T01:30",
    endtime: "2023-02-23T02:30",
    image: "/images/welcome.jpg",
  },
];

exports.find = () => events;

exports.findById = (id) => {
  return events.find((event) => event.id === id);
};

exports.findByCategory = (category) => {
  return events.filter((event) => event.category === category);
};

exports.save = (event) => {
  event.id = uuidv4();
  events.push(event);
};

exports.updateById = (id, newevent) => {
  let event = events.find((event) => event.id === id);

  if (event) {
    event.title = newevent.title;
    event.category = newevent.category;
    event.details = newevent.details;
    event.location = newevent.location;
    event.starttime = newevent.starttime;
    event.endtime = newevent.endtime;
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

exports.convertToString = (time) => {
  console.log(time);
  console.log(DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED));
  return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED);
};