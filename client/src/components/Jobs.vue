<template>
  <div class="jobs">
  <h1>Jobs</h1>
  <p>{{msg}}</p>
  <p>There are {{jobs.length}} jobs</p>
  <ul v-if="jobs.length > 0">
    <li v-for="job in jobs">
      {{job}}
    <li>
  </ul>
  <button @click="fetchJobs">Get Job List</button>
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
  methods: {
    fetchJobs: function () {
      this.$store.dispatch('FETCH_JOBS')
    }
  }
}
</script>

<style>
</style>
