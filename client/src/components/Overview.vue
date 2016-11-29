<template lang="html">
  <div class="tile is-parent">
    <div class="tile is-child box">
      <div class="level">
        <div class="level-left">
          <div class="container">
            <h1 class="title">Monitors</h1>
            <h2 class="subtitle">A list of all monitors</h2>
          </div>
        </div>
        <div class="level-right">
          <div class="container">
            <div class="content has-text-centered">
              <a class="button is-info is-outlined">
                <span class="icon">
                  <i class="fa fa-plus-circle"></i>
                </span>
                <span>Add a new monitor</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <table class="table is-striped">
        <thead>
          <tr>
            <th>Monitor</th>
            <th>Status</th>
            <th>Interval</th>
            <th>Last 24h</th>
            <th>Last 7d</th>
            <th>Last 30d</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="monitor in monitors">
            <td class="title">{{monitor.name}}</td>
            <td :class="{good: monitor.status === 'up', bad: monitor.status !== 'up'}">{{monitor.status}}</td>
            <td>{{monitor.interval}}</td>
            <td :class="{good: monitor.day >= 99, bad: monitor.day < 90, okay: monitor.day < 99 && monitor.day > 90}">{{monitor.day}}%</td>
            <td :class="{good: monitor.week >= 99, bad: monitor.week < 90, okay: monitor.week < 99 && monitor.week > 90}">{{monitor.week}}%</td>
            <td :class="{good: monitor.month >= 99, bad: monitor.month < 90, okay: monitor.month < 99 && monitor.month > 90}">{{monitor.month}}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      monitors: [
        {
          name: 'Google',
          status: 'up',
          interval: '2 mins',
          day: 100,
          week: 99.9,
          month: 99.9
        },
        {
          name: 'Facebox',
          status: 'down',
          interval: '20 mins',
          day: 92,
          week: 91.9,
          month: 88.9
        },
        {
          name: 'NSA',
          status: 'up',
          interval: '2 mins',
          day: 100,
          week: 100,
          month: 100
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '~bulma/sass/utilities/variables';

.table {
  margin-top: 20px;

  td {
    text-align: center;
    vertical-align: middle;
  }

  th {
    text-align: center;
    vertical-align: middle;
  }

  .good {
    background: $green;
  }

  .bad {
    background: $orange;
  }

  .okay {
    background: $yellow;
  }
}
</style>
