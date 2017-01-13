let mongoose = require('mongoose');
let Job = require('../model/job');
let Ping = require('../model/ping');
let pingWorker = require('../ping-worker');

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
  pingWorker.createJob(newJob);

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
          pingedAt: -1
        })
        .exec((err, pings) => {
          if (err) res.send(err);
          if (pings.length > 0) {
            job.status = pings[0].status;
            job.responseTimes = pings.map((ping) => {
              return ping.responseTime;
            }).reverse();
          } else {
            job.status = 'UNKNOWN';
            job.responseTimes = [];
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
