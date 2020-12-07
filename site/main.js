import Vue from 'vue'
import App from './App.vue'
import '@/assets/index.scss'

import 'lib-flexible/flexible.js'
import nwVue from '@'
import EimMobileJsSdk from 'eimjssdk';


/* 引入自定义iocn */
import '@/assets/fonts/iconfont.css';

// 可以全局使用jssdk,例如：this.$jssdk
Vue.prototype.myJssdk = new EimMobileJsSdk();

/* 有赞UI */
import '@/plugin/vant/vant_init.js'; //初始化

Vue.use(nwVue)
new Vue({
  el: '#app',
  render: h => h(App)
})
