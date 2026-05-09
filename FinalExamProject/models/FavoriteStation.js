const mongoose = require('mongoose');

const favoriteStationSchema = new mongoose.Schema({
  stationName: { type: String, required: true, trim: true },
  stopId:      { type: String, required: true, trim: true },
  transitType: { type: String, required: true, enum: ['subway', 'lirr'] },
  lines:       { type: [String], default: [] },
  addedAt:     { type: Date, default: Date.now }
});

favoriteStationSchema.index({ stopId: 1, transitType: 1 }, { unique: true });

module.exports = mongoose.model('FavoriteStation', favoriteStationSchema);
