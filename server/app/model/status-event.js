let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StatusEventSchema = new Schema(
  {
    jobId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('status-event', StatusEventSchema);
