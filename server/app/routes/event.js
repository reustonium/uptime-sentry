let Event = require('../model/event');

// **************************************
// GET /event route to get all the events
// **************************************
function getEvents(req, res) {
  let query = Event.find({});
  query.exec((err, events) => {
    if(err) res.send(err)
    res.json(events)
  })
}

// GET /event/:id

module.exports = {
  getEvents
}
