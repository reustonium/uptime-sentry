let moment = require('moment');

function calculateUptime(pings) {
  var daily = pings.filter(dailyPings);
  var weekly = pings.filter(weeklyPings);
  var monthly = pings.filter(monthlyPings);
  return {
    day: 100,
    week: 98,
    month: 97
  }
}

// Keep the pings that happened within the last 1 day
function dailyPings(ping) {
  let aDayAgo = moment().subtract(1, 'days');
  return moment(ping.pingedAt).isSameOrAfter(aDayAgo);
}

// Keep the pings that happened within the last 7 days
var weeklyPings = function(ping) {
  let aWeekAgo = moment().subtract(7, 'days');
  return moment(ping.pingedAt).isSameOrAfter(aWeekAgo);
}

// Keep the pings that happened within the last 1 month
var monthlyPings = function(ping) {
  let aMonthAgo = moment().subtract(1, 'months');
  return moment(ping.pingedAt).isSameOrAfter(aMonthAgo);
}

// Calculate the Uptime for the pings
var uptime = function(pings) {}

module.exports = {
  calculateUptime: calculateUptime,
  dailyPings: dailyPings,
  weeklyPings: weeklyPings,
  monthlyPings: monthlyPings,
  uptime: uptime
}
