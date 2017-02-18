let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let JobSchema = new Schema(
  {
    name: {
      type: String,
      required: false
    },
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
    uptimes: {
      day: {
        type: Number,
        required: false
      },
      week: {
        type: Number,
        required: false
      },
      month: {
        type: Number,
        required: false
      }
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
