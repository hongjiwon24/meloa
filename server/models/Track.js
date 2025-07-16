// /server/models/Track.js
const mongoose = require('mongoose');

// MongoDB에 저장되는 Metadata 구조:
const trackSchema = new mongoose.Schema({
  title: String,
  artist: String,
  lyrics: String,
  price: Number,
  filename: String,
  coverImage: String,
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Track', trackSchema);

