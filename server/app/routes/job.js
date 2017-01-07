let mongoose = require('mongoose');
let Job = require('../model/job');

// ******************************
// GET /job route to get all jobs
// ******************************
function getJobs(req, res) {
  let query = Job.find({});
  query.exec((err, jobs) => {
    if(err) res.send(err);
    res.json(jobs)
  });
}

// ***************************
// POST /job to save a new job
// ***************************
function postJob(req, res) {
  var newJob = new Job(req.body);

  newJob.save((err, job) => {
    if(err) {
      res.send(err);
    }
    else {
      res.json({message: "Job successfully added", job});
    }
  });
}

module.exports = { getJobs, postJob };
