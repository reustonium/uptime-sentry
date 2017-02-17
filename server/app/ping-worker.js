let config = require('config');
let Agenda = require('agenda');
let request = require('request');
let Job = require('./model/job');

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
  console.log('agenda job data: ' + JSON.stringify(agendaJob.attrs.data));
  request({
    method: 'GET',
    url: agendaJob.attrs.data.url,
    time: true
  }, (error, response) => {
    let url = agendaJob.attrs.data.url;

    Job.findById(agendaJob.attrs.data.jobId, (err, job) => {
      if (err) {
        console.log('ERROR!: ' + err);
      } else {
        console.log('the job returned by findById is: ' + JSON.stringify(job));
        job.status = response.statusCode;
        job.pings.push({
          response: response.statusCode,
          responseTime: response.elapsedTime,
          pingedAt: '1/1/1976'
        });
        job.save((err, job) => {
          console.log('ERROR' + err);
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
  }).repeatEvery(job.freq + ' seconds').save();
}
module.exports = {
  createJob
}
