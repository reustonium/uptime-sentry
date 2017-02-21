<template>
  <div id="app">
    <app-header></app-header>
    <div class="container app-container">
      <div class="tile is-ancestor is-vertical">
        <transition mode="out-in"
          enter-active-class="fadeInDown"
          leave-active-class="fadeOutDown" appear>
          <router-view class="animated"></router-view>
        </transition>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { AppHeader, AppFooter } from './components/'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
<style lang="scss">
@import '~animate.css';
.animated {
  animation-duration: .3s;
}
$body-background: whitesmoke;
@import '~bulma';
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

.app-container {
  margin-top: 70px;
}
</style>
