var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  padding: { type: Number, min: 2, max: 144 },
  margin: { type: Number, min: 2, max: 144 },
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 144 },
  borderWidth: { type: Number, min: 2, max: 144 },
  lastUpdate: { type: Date, default: Date.now },
  imageURL: { type: String, default: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png"},
  imageWidth: { type: Number, min: 2, max: 1000},
  imageHeight: { type: Number, min: 2, max: 1000}
});

module.exports = mongoose.model('Logo', LogoSchema);