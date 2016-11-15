<template>
  <div id="app">
    <img src="./assets/logo.png">
    <jobs></jobs>
  </div>
</template>

<script>
import Jobs from './components/Jobs'

export default {
  name: 'app',
  components: {
    Jobs
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
