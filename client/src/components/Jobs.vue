<template>
  <div class="jobs">
  <h1>Jobs</h1>
  <p>{{msg}}</p>
  <p>There are {{jobs.length}} jobs</p>
  <ul>
    <li v-for="job in jobs">
      {{job}}
    </li>
  </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'jobs',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: mapState({
    jobs: state => state.jobs
  }),
  beforeMount () {
    this.$store.dispatch('FETCH_JOBS')
  }
}
</script>

<style>
</style>
