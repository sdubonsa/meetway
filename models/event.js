const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const eventSchema = new Schema({
  title: { type: String, required: [true, "title is required"] },
  category: { type: String, required: [true, "category is required"] },
  details: { type: String, required: [true, "detail is required"] },
  location: { type: String, required: [true, "location is required"] },
  starttime: { type: Date, required: [true, "starttime is required"] },
  endtime: { type: Date, required: [true, "endttime is required"] },
  image: { type: String, required: [true, "image is required"] },
},{timestamps: true});

module.exports = mongoose.model("Event", eventSchema);

exports.findByCategory = (category) => {
  return events.filter((event) => event.category === category);
};

//exports.convertToString = (time) => {
 // console.log(time);
  //console.log(DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED));
  //return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED);
//};
