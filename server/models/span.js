const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpanSchema = new Schema();

const Span = mongoose.model('span', SpanSchema);

module.exports = Span;
