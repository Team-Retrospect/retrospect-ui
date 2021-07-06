const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpanSchema = new Schema();
// {
// 	span_id: {
// 		type: Number,
// 		required: true,
// 	},
// 	trace_id: {
// 		type: Number,
// 		required: true,
// 	},
// 	session_id: {
// 		type: Number,
// 		required: true,
// 	},
// 	user_id: {
// 		type: Number,
// 		required: true,
// 	},
// 	trigger_route: {
// 		type: String,
// 		required: true,
// 	},
// 	time_sent: {
// 		type: Date,
// 		required: true,
// 	},
// 	status_code: {
// 		type: Number,
// 		required: true,
// 	},
// 	span_data: {
// 		type: Object,
// 		required: true,
// 	},
// },
// { timestamps: true }

const Span = mongoose.model("span", SpanSchema);

module.exports = Span;
