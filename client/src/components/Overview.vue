<template lang="html">
  <div class="tile is-parent">
    <div class="tile is-child box">
      <div class="container">
        <h1 class="title">Monitors</h1>
        <h2 class="subtitle">A list of all monitors</h2>
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
          <tr>
            <td>Google</td>
            <td>Up</td>
            <td>2 mins</td>
            <td>100%</td>
            <td>99.9%</td>
            <td>99.9%</td>
          </tr>
          <tr>
            <td>Facebox</td>
            <td>Up</td>
            <td>1 min</td>
            <td>92%</td>
            <td>91.9%</td>
            <td>89.9%</td>
          </tr>
          <tr>
            <td>NSA</td>
            <td>Up</td>
            <td>20 mins</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.table {
  margin-top: 20px;
}
</style>
