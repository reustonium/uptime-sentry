let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let cors = require('cors');
let bodyParser = require('body-parser');
let config = require('config');
let job = require('./app/routes/job');
let ping = require('./app/routes/ping');

// ********
// Database
// ********
mongoose.connect(config.dbhostData);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// **********
// Middleware
// **********
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// ******
// Routes
// ******
app.route('/job')
  .get(job.getJobs)
  .post(job.postJob);
app.route('/job/:id')
  .get(job.getJob);
app.route('/ping')
  .post(ping.postPing);

app.listen(3000);

module.exports = app;
