import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routerConfig.js'

Vue.use(VueRouter);

const router = new VueRouter({
  base: './',
  routes,
});

export default router;
