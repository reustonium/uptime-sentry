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
              <router-link to="/addMonitor" class="button is-info is-outlined">
                <span class="icon">
                  <i class="fa fa-plus-circle"></i>
                </span>
                <span>Add a new monitor</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <table class="table is-striped">
        <thead>
          <tr class="title is-5">
            <th>Monitor</th>
            <th>Status</th>
            <th>Interval</th>
            <th>Last 24h</th>
            <th>Last 7d</th>
            <th>Last 30d</th>
          </tr>
        </thead>
        <tbody>
          <tr class="title is-4" v-for="monitor in monitors">
            <td>{{monitor.name}}</td>
            <td :class="{up: monitor.status === 'up', down: monitor.status !== 'up'}">
              {{monitor.status}}
            </td>
            <td>{{monitor.interval}}</td>
            <td :class="{good: monitor.day >= 98, bad: monitor.day < 98}">
              <strong>{{monitor.day}}%</strong>
            </td>
            <td :class="{good: monitor.week >= 98, bad: monitor.week < 98}">
              <strong>{{monitor.week}}%</strong>
            </td>
            <td :class="{good: monitor.month >= 98, bad: monitor.month < 98}">
              <strong>{{monitor.month}}%</strong>
            </td>
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
          week: 97.9,
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
    color: $green;
  }

  .bad {
    color: $orange;
  }

  .up {
    background: $green;
  }

  .down {
    background: $orange;
  }
}
</style>
