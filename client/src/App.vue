<template>
  <div id="app">
    <app-header></app-header>
    <div class="container app-container">
      <div class="tile is-ancestor is-vertical">
        <overview></overview>
        <activity></activity>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { AppHeader, AppFooter, Overview, Activity } from './components/'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
    Overview,
    Activity
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
