let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let JobSchema = new Schema(
  {
    url: {type: String, required: true},
    freq: {type: Number, required: true}
  }
)

module.exports = mongoose.model('job', JobSchema);