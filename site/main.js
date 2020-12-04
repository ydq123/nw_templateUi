import Vue from 'vue'
import App from './App.vue'
import '@/assets/index.scss'
import 'lib-flexible/flexible.js'
import nwVue from '@'


/* 引入自定义iocn */
import '@/assets/fonts/iconfont.css';
/* 有赞UI */
import '@/plugin/vant/vant_init.js'; //初始化


Vue.use(nwVue)
new Vue({
  el: '#app',
  render: h => h(App)
})
