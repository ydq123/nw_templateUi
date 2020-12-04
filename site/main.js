import Vue from 'vue'
import App from './App.vue'
import '@/assets/index.scss'
import 'lib-flexible/flexible.js'
import nwVue from '@'


/* 引入自定义iocn */
import '@/assets/fonts/iconfont.css';

Vue.use(nwVue)
new Vue({
  el: '#app',
  render: h => h(App)
})
