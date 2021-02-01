

import './index.css';
import './icon/local.css'; //本地-icon引用字体css
import Vue from 'vue'
// 按需全局引入 vant组件
const vant = require('./vant.min.js');
Vue.use(vant);
Vue.prototype.vant = vant;
//设置加载loading 长时间显示, 设置为背景不可点击
vant.Toast.setDefaultOptions('loading', { duration: 0, forbidClick: true});
vant.Toast.allowMultiple();
// /* 图片懒加载 */
Vue.use(vant.Lazyload, {lazyComponent: true});
