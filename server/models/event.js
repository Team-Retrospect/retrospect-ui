const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema();

const Event = mongoose.model('event', EventSchema);

module.exports = Event;
