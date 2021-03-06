process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let Uptime = require('../app/uptime');
let moment = require('moment');

describe('Uptime', () => {

  describe('calculateUptime', () => {
    it('should return 100 for a single good ping', () => {
      let pings = [{
        response: 200,
        responseTime: 100,
        pingedAt: moment().subtract(1, 'minute')
      }]
      expect(Uptime.calculateUptime(pings)).to.eql({
        day: 100,
        week: 100,
        month: 100
      });
    });

    it('should return 0 for a single bad ping', () => {
      let pings = [{
        response: 404,
        responseTime: 100,
        pingedAt: moment().subtract(1, 'minute')
      }]

      expect(Uptime.calculateUptime(pings)).to.eql({
        day: 0,
        week: 0,
        month: 0
      });
    });

    it('should return 50 for three pings of equal up and down time', () => {

      let pings = [{
        response: 200,
        responseTime: 10,
        pingedAt: moment().hours(0).minutes(0).seconds(0)
      }, {
        response: 404,
        responseTime: 10,
        pingedAt: moment().hours(0).minutes(1).seconds(0)
      }, {
        response: 200,
        responseTime: 10,
        pingedAt: moment().hours(0).minutes(2).seconds(0)
      }]

      expect(Uptime.calculateUptime(pings)).to.be.eql({
        day: 50,
        week: 50,
        month: 50
      });
    });
  });

  describe('dailyPings', () => {
    it('should return a ping that occured in the last day', () => {
      let todayPing = {
        pingedAt: moment().subtract(1, 'hour')
      };
      expect(Uptime.dailyPings(todayPing)).to.be.ok;
    });

    it('should filter out a ping that occured more than a day ago', () => {
      let oldPing = {
        pingedAt: moment().subtract(2, 'days')
      };
      expect(Uptime.dailyPings(oldPing)).to.not.be.ok;
    });
  });

  describe('weeklyPings', () => {
    it('should return a ping that occured in the last week', () => {
      let recentPing = {
        pingedAt: moment().subtract(2, 'days')
      };
      expect(Uptime.weeklyPings(recentPing)).to.be.ok;
    });

    it('should filter out a ping that occured more than a week ago', () => {
      let oldPing = {
        pingedAt: moment().subtract(2, 'weeks')
      };
      expect(Uptime.weeklyPings(oldPing)).to.not.be.ok;
    });
  });

  describe('monthlyPings', () => {
    it('should return a ping that occured in the last month', () => {
      let recentPing = {
        pingedAt: moment().subtract(2, 'weeks')
      };
      expect(Uptime.monthlyPings(recentPing)).to.be.ok;
    });

    it('should filter out a ping that occured more than a month ago', () => {
      let oldPing = {
        pingedAt: moment().subtract(2, 'months')
      };
      expect(Uptime.monthlyPings(oldPing)).to.not.be.ok;
    });
  });

  describe('calculateUptime', () => {
    it('should return 100% uptime if all statuses are 200', () => {
      let pings = [{
        response: 200,
        responseTime: 100,
        pingedAt: moment().subtract(1, 'minute')
      },
        {
          response: 200,
          responseTime: 100,
          pingedAt: moment().subtract(2, 'minutes')
        }];

      expect(Uptime.uptime(pings)).to.eql(100);
    });
  });
});
