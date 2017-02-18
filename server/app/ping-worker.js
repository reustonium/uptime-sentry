let config = require('config');
let Agenda = require('agenda');
let request = require('request');
let Job = require('./model/job');
let Uptime = require('./uptime');

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
        job.status = response.statusCode === 200 ? 'up' : 'down';
        job.pings.push({
          response: response.statusCode,
          responseTime: response.elapsedTime,
          pingedAt: response.responseStartTime
        });

        // Calculate Uptimes
        job.uptimes = Uptime.calculateUptime(job.pings)

        // Save the job
        job.save((err, job) => {
          if (err) {
            console.log('ERROR' + err);
          }
          console.log('SUCCESS' + job);
        });
      }
    });
  });
  done();
});

function createJob(job) {
  agenda.create('ping', {
    url: job.url,
    jobId: job._id.toString()
  }).repeatEvery(job.freq + ' minutes').save();
}
module.exports = {
  createJob
}
