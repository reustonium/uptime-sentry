let moment = require('moment');
let Event = require('./model/event');

function jobCreatedEvent(job) {
  let newEvent = new Event({
    jobId: job._id.toString(),
    name: job.name,
    status: job.status,
    date: moment(),
    reason: "Job Created",
    duration: "0 seconds"
  });

  newEvent.save((err, event) => {
    console.log(err);
    console.log(event);
  });
}

module.exports = {jobCreatedEvent}
