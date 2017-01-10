let mongoose = require('mongoose');
let Ping = require('../model/ping');

// *****************************
// POST /ping to save a new ping
// *****************************
function postPing(req, res) {
  let newPing = new Ping(req.body);

  newPing.save((err, ping) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "Ping successfully added",
        ping
      });
    }
  });
}

module.exports = {
  postPing
};
