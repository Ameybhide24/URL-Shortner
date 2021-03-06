const mongoose = require('mongoose');
const shortId = require('shortid');
const User = require('./User');
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: String,
  },
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
