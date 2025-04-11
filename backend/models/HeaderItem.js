const mongoose = require('mongoose');

const headerItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  link: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HeaderItem', headerItemSchema);