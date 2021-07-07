const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  // {
  // 	session_id: {
  // 		type: String,
  // 		required: true,
  // 	},
  // 	user_id: {
  // 		type: String,
  // 		// required: true,
  // 	},
  // 	time_sent: {
  // 		type: Date,
  // 		required: true,
  // 	},
  // 	event_data: {
  // 		type: Object,
  // 		// required: true,
  // 	},
  // },
  // { timestamps: true }
);

const Event = mongoose.model("event", EventSchema);

module.exports = Event;

