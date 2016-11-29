import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Main from './components/Main.vue'

Vue.use(VueRouter)

const Comp = { template: '<div>MY THING</div>' }
const routes = [
  { path: '/', component: Main },
  { path: '/newMonitor', component: Comp }
]
const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})

app.$mount('#app')
