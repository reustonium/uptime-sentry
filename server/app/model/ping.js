let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PingSchema = new Schema(
  {
    jobId: {type: Number, required: true},
    status: {type: String, required: true},
    responseTime: {type: Number, required: true}
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('ping', PingSchema);
