<template>
  <div id="app">
    <app-header></app-header>
    <div class="container app-container">
      <div class="tile is-ancestor">
        <monitor-card></monitor-card>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import MonitorCard from './components/MonitorCard'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
    MonitorCard
  }
}
</script>
<style lang="scss">
@import '~bulma';
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

.app-container {
  margin-top: 60px;
}
</style>
