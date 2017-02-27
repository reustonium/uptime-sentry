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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody name="table-row" is="transition-group" leave-active-class="animated fadeOutRight">
            <tr class="title is-4" v-for="monitor in monitors" :key="monitor.name">
              <td>{{monitor.name}}</td>
              <td :class="{up: monitor.status === 'up', down: monitor.status !== 'up', created: monitor.status === 'created'}">
                {{monitor.status}}
              </td>
              <td>{{monitor.freq}} minutes</td>
              <td :class="{good: monitor.uptimes.day >= 98, bad: monitor.uptimes.day < 98}">
                <strong>{{monitor.uptimes.day}}%</strong>
              </td>
              <td :class="{good: monitor.uptimes.week >= 98, bad: monitor.uptimes.week < 98}">
                <strong>{{monitor.uptimes.week}}%</strong>
              </td>
              <td :class="{good: monitor.uptimes.month >= 98, bad: monitor.uptimes.month < 98}">
                <strong>{{monitor.uptimes.month}}%</strong>
              </td>
              <td>
                <a class="button is-danger is-outlined" @click="removeJob(monitor._id)">x</a>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  mounted () {
    this.fetchData()
  },
  data () {
    return {
      monitors: []
    }
  },
  methods: {
    fetchData () {
      this.$http.get('http://localhost:3000/job/').then(res => {
        this.monitors = res.body
      })
    },
    removeJob (monitor) {
      this.$http.delete('http://localhost:3000/job/' + monitor).then(res => {
        console.log(JSON.stringify(res.body))
        this.fetchData()
      })
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
  .created {
    background: $primary;
  }
}

//List Animations
.animated {
  animation-duration: 0.666s;
}
</style>
