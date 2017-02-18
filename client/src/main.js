import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Main from './components/Main.vue'
import AddMonitor from './components/AddMonitor.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/addMonitor',
    component: AddMonitor
  }
]
const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  router
})

app.$mount('#app')
