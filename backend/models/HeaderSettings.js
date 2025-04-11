const mongoose = require('mongoose');

const headerSettingSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  logo: { type: String, required: true },
  logoWidth: { type: Number, default: 100 },
  logoHeight: { type: Number, default: 50 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HeaderSetting', headerSettingSchema);