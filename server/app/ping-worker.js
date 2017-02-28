let config = require('config');
let Agenda = require('agenda');
let request = require('request');
let Job = require('./model/job');
let StatusEvent = require('./model/status-event');
let Uptime = require('./uptime');
let EventManager = require('./event-manager');
let moment = require('moment');

let agenda = new Agenda({
  db: {
    address: config.dbhost
  }
});

agenda.on('fail', (err, job) => {
  console.log(err);
});

// Wait for Agenda to connect to the DB
agenda.on('ready', () => {
  //start agenda
  console.log('Agenda is ready');
  agenda.start();
});

// Define a job that pings a URL and writes status code, and response time to DB
agenda.define('ping', function(agendaJob, done) {
  let url = agendaJob.attrs.data.url
  let jobId = agendaJob.attrs.data.jobId

  request({
    method: 'GET',
    url: url,
    time: true
  }, (error, response) => {

    Job.findById(jobId, (err, job) => {
      if (err) {
        console.log('ERROR!: ' + err);
      } else {


        //if the request had an error (timeout?) then change how we set the status
        let status = error ? 'down' : response.statusCode === 200 ? 'up' : 'down';
        let pingPingedAt = error ? moment() : response.responseStartTime;

        // Check for Up/Down Status Events
        let duration = job.pings.length > 0 ? pingPingedAt - job.pings[job.pings.length - 1] : 0;
        createStatusEvent(jobId, job.name, job.status, status, duration);

        let pingResponse = error ? 504 : response.statusCode;
        let pingResponseTime = error ? 10000 : response.elapsedTime;

        job.status = status
        job.pings.push({
          response: pingResponse,
          responseTime: pingResponseTime,
          pingedAt: pingPingedAt
        });

        // Calculate Uptimes
        job.uptimes = Uptime.calculateUptime(job.pings)

        // Save the job
        job.save((err, job) => {
          if (err) {
            console.log('ERROR' + err);
          }
        });
      }
    });
  });
  done();
});

function createJob(job) {
  // Create the Job's "Created Status Event"
  EventManager.jobCreatedStatusEvent(job);

  agenda.create('ping', {
    url: job.url,
    jobId: job._id.toString()
  }).repeatEvery(job.freq + ' minutes').save();
}

function cancelJob(jobId) {
  agenda.cancel({
    "data.jobId": jobId
  });
}

function createStatusEvent(jobId, jobName, previousStatus, currentStatus, duration) {
  if (previousStatus !== currentStatus) {
    let statusEvent = new StatusEvent({
      jobId: jobId,
      name: jobName,
      status: currentStatus,
      date: moment(),
      reason: currentStatus,
      duration: duration
    });

    statusEvent.save();
  }
}
module.exports = {
  createJob,
  cancelJob
}
