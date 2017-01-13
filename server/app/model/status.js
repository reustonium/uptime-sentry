let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StatusSchema = new Schema(
  {
    jobId: {
      type: String,
      required: true
    },
    statusTime: {
      type: Date,
      required: true
    },
    statusEvent: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('status', StatusSchema);
