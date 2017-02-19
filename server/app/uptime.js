let moment = require('moment');

function calculateUptime(pings) {
  var daily = pings.filter(dailyPings);
  var weekly = pings.filter(weeklyPings);
  var monthly = pings.filter(monthlyPings);
  return {
    day: uptime(daily),
    week: uptime(weekly),
    month: uptime(monthly)
  }
}

// Keep the pings that happened within the last 1 day
function dailyPings(ping) {
  let aDayAgo = moment().subtract(1, 'days');
  return moment(ping.pingedAt).isSameOrAfter(aDayAgo);
}

// Keep the pings that happened within the last 7 days
function weeklyPings(ping) {
  let aWeekAgo = moment().subtract(7, 'days');
  return moment(ping.pingedAt).isSameOrAfter(aWeekAgo);
}

// Keep the pings that happened within the last 1 month
function monthlyPings(ping) {
  let aMonthAgo = moment().subtract(1, 'months');
  return moment(ping.pingedAt).isSameOrAfter(aMonthAgo);
}

// Calculate the Uptime for the pings
function uptime(pings) {
  let uptimeMiliseconds = 0;
  let downtimeMiliseconds = 0;

  //If there is only one ping we have to assume a 200 means it's 100% up
  if (pings.length === 1) {
    return pings[0].response === 200 ? 100 : 0;
  }

  for (let i = 1; i < pings.length; i++) {
    let duration = moment(pings[i].pingedAt).diff(moment(pings[i - 1].pingedAt));
    if (pings[i].response === 200) {
      uptimeMiliseconds += duration;
    } else {
      downtimeMiliseconds += duration;
    }
  }

  return uptimeMiliseconds * 100 / (uptimeMiliseconds + downtimeMiliseconds)
}

module.exports = {
  calculateUptime: calculateUptime,
  dailyPings: dailyPings,
  weeklyPings: weeklyPings,
  monthlyPings: monthlyPings,
  uptime: uptime
}
