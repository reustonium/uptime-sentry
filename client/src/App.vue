<template>
<div id="app">
  <app-main></app-main>
  <footer-bar></footer-bar>
</div>
</template>

<script>
import { AppMain, FooterBar } from 'components/layout'

export default {
  name: 'app',
  components: {
    AppMain,
    FooterBar
  }
}
</script>

<style lang="sass">@import '~bulma';</style>
