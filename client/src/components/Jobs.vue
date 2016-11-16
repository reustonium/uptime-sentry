<template>
  <div class="jobs">
  <h1>Jobs</h1>
  <p>There are {{jobs.length}} jobs</p>
  <jobDetail
    v-for="job in jobs"
    v-bind:job="job">
  </JobDetail>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JobDetail from './JobDetail'

export default {
  name: 'jobs',
  components: {
    JobDetail
  },
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
