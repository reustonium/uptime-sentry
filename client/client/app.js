import Vue from 'vue'
import Resource from 'vue-resource'
import App from './App.vue'
import store from './store'

Vue.use(Resource)

const app = new Vue({
  store,
  ...App
})

export { app, store }
