<template>
  <div id="app">
    <app-header></app-header>
    <div class="container app-container">
      <div class="tile is-ancestor is-vertical">
        <overview></overview>
        <monitor-card></monitor-card>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { AppHeader, AppFooter, Overview, MonitorCard } from './components/'
console.log(AppHeader)

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
    Overview,
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
