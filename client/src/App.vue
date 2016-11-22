<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <h1>hi</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
@import "bulma"

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
