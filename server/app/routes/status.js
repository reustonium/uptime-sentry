let mongoose = require('mongoose');
let Status = require('../model/status');

// *****************************
// POST /event to save a new event
// *****************************
function postStatus(req, res) {
  let newStatus = new Status(req.body);

  newStatus.save((err, status) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "Status successfully added",
        status
      });
    }
  });
}

module.exports = {
  postStatus
};
