// make a schema for rsvp
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rsvpSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "event is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    status: {
      type: String,
      enum: ["yes", "no", "maybe"],
      default: "yes",
      required: [true, "status is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rsvp", rsvpSchema);
