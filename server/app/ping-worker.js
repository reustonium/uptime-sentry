let config = require('config');
let Agenda = require('agenda');
let request = require('request');
let Ping = require('./model/ping');

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
agenda.define('ping', function(job, done) {
  request({
    method: 'GET',
    url: job.attrs.data.url,
    time: true
  }, (error, response) => {
    console.log('response from the agenda job:');
    console.log(response);
    var url = job.attrs.data.url;
    var ping = new Ping({
      jobId: job.attrs.id,
      status: response.statusCode.toString(),
      responseTime: response.elapsedTime,
      pingeddAt: Date.now()
    });
    ping.save();
  });
  done();
});

function createJob(job) {
  agenda.create('ping', {
    url: job.url
  }).repeatEvery(job.freq).save();
}
module.exports = {
  createJob
}
