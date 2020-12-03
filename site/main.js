import Vue from 'vue'
import App from './App.vue'
import '@/assets/index.scss'
import 'lib-flexible/flexible.js'
import nwVue from '@'

Vue.use(nwVue)
new Vue({
  el: '#app',
  render: h => h(App)
})
