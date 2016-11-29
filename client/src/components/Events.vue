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
            <td :class="{up: event.status === 'up', down: event.status !== 'up'}">
              <strong>{{event.status}}</strong>
            </td>
            <td>{{event.date}}</td>
            <td>{{event.reason}}</td>
            <td>{{event.duration}}</td>
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
      events: [
        {
          name: 'Google',
          status: 'up',
          date: 'November 29th, 2000',
          reason: 'OK',
          duration: '200h 9m'
        },
        {
          name: 'Facebox',
          status: 'down',
          date: 'November 29th, 2000',
          reason: 'Timeout',
          duration: '1h 1m'
        },
        {
          name: 'NSA',
          status: 'up',
          date: 'November 29th, 2000',
          reason: 'OK',
          duration: '100000h'
        },
        {
          name: 'NSA',
          status: 'up',
          date: 'November 28th, 2000',
          reason: 'OK',
          duration: '100000h'
        },
        {
          name: 'Facebox',
          status: 'up',
          date: 'November 29th, 2000',
          reason: 'OK',
          duration: '1h 1m'
        },
        {
          name: 'Facebox',
          status: 'down',
          date: 'November 29th, 2000',
          reason: '500',
          duration: '1h 1m'
        },
        {
          name: 'Google',
          status: 'up',
          date: 'November 26th, 2000',
          reason: 'OK',
          duration: '200h 9m'
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

  .up {
    color: $green;
  }

  .down {
    color: $orange;
  }
}
</style>
