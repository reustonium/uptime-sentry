let mongoose = require('mongoose');
let Job = require('../model/job');
let Ping = require('../model/ping');

// ******************************
// GET /job route to get all jobs
// ******************************
function getJobs(req, res) {
  let query = Job.find({});
  query.exec((err, jobs) => {
    if (err) res.send(err);
    res.json(jobs)
  });
}

// ***************************
// POST /job to save a new job
// ***************************
function postJob(req, res) {
  let newJob = new Job(req.body);

  newJob.save((err, job) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "Job successfully added",
        job
      });
    }
  });
}

// ***********************************
// GET /job/:id route to get job by id
// ***********************************
function getJob(req, res) {
  Job.findById({
    _id: req.params.id
  })
    .lean()
    .exec((err, job) => {
      if (err) res.send(err);
      Ping.find({
        jobId: job._id
      })
        .sort({
          createdAt: -1
        })
        .limit(1)
        .exec((err, ping) => {
          if (err) res.send(err);
          if (ping.length > 0) {
            job.status = ping[0].status;
          } else {
            job.status = 'UNKNOWN';
          }
          res.json(job);
        });
    });
}

module.exports = {
  getJobs,
  postJob,
  getJob
};
