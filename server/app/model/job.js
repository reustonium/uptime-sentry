let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let JobSchema = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    freq: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    pings: [
      {
        response: {
          type: Number,
          required: true
        },
        responseTime: {
          type: Number,
          required: true
        },
        pingedAt: {
          type: Date,
          required: true
        }
      }
    ]

  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('job', JobSchema);
