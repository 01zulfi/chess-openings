const mongoose = require('mongoose');

const { Schema } = mongoose;

const VariationSchema = new Schema({
  name: { type: String, required: true },
  moves: { type: String },
  description: { type: String },
  origin: { type: String },
  opening: { type: Schema.ObjectId, ref: 'Opening' },
});

VariationSchema.virtual('url').get(function getVariationUrl() {
  return `/variations/${this._id}`;
});

module.exports = mongoose.model('Variation', VariationSchema);
