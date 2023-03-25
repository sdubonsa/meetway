const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    category: { type: String, required: [true, "category is required"] },
    details: { type: String, required: [true, "detail is required"] },
    location: { type: String, required: [true, "location is required"] },
    starttime: { type: Date, required: [true, "starttime is required"] },
    endtime: { type: Date, required: [true, "endttime is required"] },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

//exports.convertToString = (time) => {
 // console.log(time);
  //console.log(DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED));
  //return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED);
//};
