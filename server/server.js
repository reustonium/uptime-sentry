var express = require('express');
var bodyParser = require('body-parser');
var Agenda = require('agenda');
var mongoConnectionString = "mongodb://127.0.0.1/agenda";
var agenda = new Agenda({db: {address: mongoConnectionString}});

//************************************
// Agenda Job Configuration
//************************************

// Define a job that pings a URL and writes status code, and response time to DB
agenda.define('ping', function(job, done) {
  console.log(job.attrs.data.url);
  //TODO ping the URL and write to DB
  done();
});

// Wait for Agenda to connect to the DB
agenda.on('ready', function(){
  
  // Grab all the jobs from the DB and kick them off
  agenda.jobs({name: 'ping'}, function(err, jobs){
    jobs.forEach(function(job){
      
      // Create a new 'ping' job with the url and repeatInterval
      agenda.create('ping', {url: job.attrs.data.url}).repeatEvery(job.attrs.repeatInterval).save();
    });
  });

  //start agenda
  console.log('Agenda is ready');
  agenda.start();
});

agenda.on('error', function(){
  console.log('Agenda has a problem :-(');
})

//************************************
// Express Application
//************************************
var app = express();
app.use(bodyParser.json());

app.post('/ping', function(req, res, next) {
  var data = req.body;
  var freq = data.freq + ' seconds';
  agenda.create('ping', {url: data.url}).repeatEvery(freq).save();
  res.status(200).json(data);
});

app.get('/jobs', function(req, res, next){
  agenda.jobs({name: 'ping'}, function(err, jobs){
    if(!err){
      res.status(200).json(jobs);
    } else {
      res.status(500).json(err);
    }
  })
});

//TODO delete job

app.listen(3000);