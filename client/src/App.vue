<template>
  <div id="app">
    <app-header></app-header>
    <h1>test</h1>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  name: 'app',
  components: {
    AppHeader
  }
}
</script>
<style lang="scss">
@import '~bulma';
</style>
