process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Job = require('../app/model/job');
let Ping = require('../app/model/ping');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Jobs', () => {
  beforeEach((done) => {
    Job.remove({}, (err) => {
    }).then(Ping.remove({}, (err) => {
      done();
    }))

  });

  describe('/GET job', () => {
    it('should get all the jobs', (done) => {
      chai.request(server)
        .get('/job')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST job', () => {
    it('should not POST a job with a missing URL paramter', (done) => {
      let job = {
        freq: 60
      }

      chai.request(server)
        .post('/job')
        .send(job)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('url');
          res.body.errors.url.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should POST a job', (done) => {
      let job = {
        url: "http://google.com",
        freq: 60
      }

      chai.request(server)
        .post('/job')
        .send(job)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Job successfully added');
          res.body.job.should.have.property('url');
          res.body.job.should.have.property('freq');
          done();
        });
    });
  });

  describe('/GET/:id job', () => {
    it('should get a job with a given id and no status', (done) => {
      let job = new Job({
        url: "http://google.com",
        freq: 60
      });

      job.save((err, job) => {
        chai.request(server)
          .get('/job/' + job.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('url');
            res.body.should.have.property('freq');
            res.body.should.have.property('_id').eql(job.id);
            res.body.should.have.property('status').eql('UNKNOWN');
            done();
          });
      });

    });
  });

  describe('/GET/:id job with status', () => {
    it('should get a job and return UP status', (done) => {
      let job = new Job({
        url: "https://google.com",
        freq: 60
      });

      job.save((err, job) => {
        let ping = new Ping({
          jobId: job._id,
          status: 'UP',
          responseTime: 134,
          pingedAt: new Date("1/1/2017")
        });

        ping.save((err, ping) => {
          chai.request(server)
            .get('/job/' + job.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.a('object');
              res.body.should.have.property('url');
              res.body.should.have.property('freq');
              res.body.should.have.property('_id').eql(job.id);
              res.body.should.have.property('status').eql('UP');
              done();
            });
        });
      })
    });
  });

  describe('/GET/:id job with responseTime array', () => {
    it('should get a job and return an array of response times', (done) => {
      let job = new Job({
        url: "https://google.com",
        freq: 60
      });

      job.save((err, job) => {
        let ping1 = new Ping({
          jobId: job._id,
          status: 'UP',
          responseTime: 100,
          pingedAt: new Date("1/1/2017")
        });

        let ping2 = new Ping({
          jobId: job._id,
          status: 'UP',
          responseTime: 101,
          pingedAt: new Date("1/2/2017")
        });

        let ping3 = new Ping({
          jobId: job._id,
          status: 'UP',
          responseTime: 102,
          pingedAt: new Date("1/3/2017")
        });

        Ping.insertMany([ping1, ping2, ping3], (err, pings) => {
          chai.request(server)
            .get('/job/' + job.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.a('object');
              res.body.should.have.property('url');
              res.body.should.have.property('freq');
              res.body.should.have.property('_id').eql(job.id);
              res.body.should.have.property('status').eql('UP');
              res.body.should.have.property('responseTimes').eql([100, 101, 102]);
              done();
            });
        });

      });
    });
  });
});
