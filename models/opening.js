const mongoose = require('mongoose');

const { Schema } = mongoose;

const OpeningSchema = new Schema({
  name: { type: String, required: true },
  moves: { type: String, required: true },
  description: { type: String },
  origin: { type: String },
  variations: [{ type: Schema.ObjectId, ref: 'Variation' }],
  chessDotComUrl: { type: String },
});

OpeningSchema.virtual('url').get(function getOpeningUrl() {
  return `/openings/${this._id}`;
});

module.exports = mongoose.model('Opening', OpeningSchema);
