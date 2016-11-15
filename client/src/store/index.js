import Vue from 'vue'
import Vuex from 'vuex'
import {fetchJobs} from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    jobs: []
  },
  actions: {
    FETCH_JOBS: ({commit}) => {
      fetchJobs().then(jobs => commit('SET_JOBS', {jobs}))
    }
  },
  mutations: {
    SET_JOBS: (state, {jobs}) => {
      state.jobs = jobs
    }
  }
})

export default store
