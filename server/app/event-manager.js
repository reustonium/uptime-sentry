let moment = require('moment');
let StatusEvent = require('./model/status-event');

function jobCreatedStatusEvent(job) {
  let newStatusEvent = new StatusEvent({
    jobId: job._id.toString(),
    name: job.name,
    status: job.status,
    date: moment(),
    reason: "Job Created",
    duration: "0 seconds"
  });

  newStatusEvent.save((err, statusEvent) => {
    console.log(err);
    console.log(statusEvent);
  });
}

module.exports = {
  jobCreatedStatusEvent
}
