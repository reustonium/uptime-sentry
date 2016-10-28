var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pingSchema = new Schema({
  id: Number,
  url: String,
  status: Number,
  responseTime: Number,
  createdAt: Date
});

var Ping = mongoose.model('Ping', pingSchema);

module.exports = Ping;