let StatusEvent = require('../model/status-event');

// **************************************
// GET /event route to get all the events
// **************************************
function getStatusEvents(req, res) {
  let query = StatusEvent.find({});
  query.exec((err, statusEvents) => {
    if (err) res.send(err)
    res.json(statusEvents)
  })
}

// GET /event/:id

module.exports = {
  getStatusEvents
}
