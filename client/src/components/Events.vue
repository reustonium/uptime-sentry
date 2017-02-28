<template>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <div class="container">
        <h1 class="title">Events</h1>
      </div>
      <table class="table is-striped">
        <thead>
          <tr class="title is-6">
            <th>Monitor</th>
            <th>Event</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr class="title is-5" v-for="event in events">
            <td>{{event.name}}</td>
            <td :class="{
              up: event.status === 'up',
              down: event.status !== 'up',
              created: event.status === 'created'}">
              <strong>{{event.status}}</strong>
            </td>
            <td>{{event.date | date}}</td>
            <td>{{event.reason}}</td>
            <td>{{event.duration}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
let moment = require('moment')
export default {
  mounted () {
    this.fetchData()
  },
  data () {
    return {
      events: []
    }
  },
  methods: {
    fetchData () {
      this.$http.get('http://localhost:3000/event/').then(res => {
        this.events = res.body.reverse()
      })
    }
  },
  filters: {
    date: function (date) {
      return moment(date).format('HH:mm MMMM DD, YYYY')
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
  .up {
    color: $green;
  }
  .down {
    color: $orange;
  },
  .created {
    color: $green;
  }
}
</style>
