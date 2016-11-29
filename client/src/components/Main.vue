<template>
  <div>
    <overview></overview>
    <events></events>
  </div>
</template>

<script>
import { Overview, Events } from './'

export default {
  name: 'app',
  components: {
    Overview,
    Events
  }
}
</script>

<style lang="scss">
</style>
