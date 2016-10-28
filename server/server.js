var express = require('express');
var bodyParser = require('body-parser');
var Agenda = require('agenda');
var agendaConnectionString = "mongodb://127.0.0.1/agenda";
var dataConnectionString = "mongodb://127.0.0.1/data";
var agenda = new Agenda({db: {address: agendaConnectionString}});
var request = require('request');
var mongoose = require('mongoose');
var Ping = require('./ping');

mongoose.connect(dataConnectionString);

//************************************
// Agenda Job Configuration
//************************************

// Define a job that pings a URL and writes status code, and response time to DB
agenda.define('ping', function(job, done) {
  request({method: 'GET', url: job.attrs.data.url, time: true}, function(error, response){
    console.log(JSON.stringify(response.elapsedTime));
    var url = job.attrs.data.url;
    var ping = new Ping({
      id: job.attrs.id,
        url: job.attrs.data.url.split('://')[1],
        status: response.statusCode,
        responseTime: response.elapsedTime,
        createdAt: Date.now()
    });
    ping.save();
  });
  done();
});

// Wait for Agenda to connect to the DB
agenda.on('ready', function(){

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

app.get('/ping/:url', function(req, res, next){
  Ping.find({url:req.params.url}, function(err, pings){
    if(err) throw err;
    res.status(200).json(pings);
  })
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

//Used only for development
app.get('/nuke', function(req, res, next){
  agenda.cancel({name: 'ping'}, function(err, numRemoved) {
    res.status(200).json(numRemoved);
});
});

app.listen(3000);