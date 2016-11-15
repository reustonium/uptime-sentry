import Vue from 'vue'
import App from './App'
import store from './store'

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})

export {app, store}
