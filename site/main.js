import Vue from 'vue'
import App from './App.vue'
import '@/assets/index.scss'
import 'lib-flexible/flexible.js'
import nwVue from '@'


/* 引入自定义iocn */
import '@/assets/fonts/iconfont.css';
/* 有赞UI */
// import '@/plugin/vant/vant_init.js'; //初始化

import '@/plugin/vant/index.css';
import '@/plugin/vant/icon/local.css'; //本地-icon引用字体css
import '@/plugin/vant/vant.min.js';
console.log('-----');
// console.log(vant);
//设置加载loading 长时间显示, 设置为背景不可点击
// vant.Toast.setDefaultOptions('loading', { duration: 0, forbidClick: true});
// vant.Toast.allowMultiple();
// /* 图片懒加载 */
// Vue.use(vant.Lazyload, {lazyComponent: true});




Vue.use(nwVue)
new Vue({
  el: '#app',
  render: h => h(App)
})
