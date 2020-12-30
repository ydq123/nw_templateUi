import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routerConfig.js'

Vue.use(VueRouter);

const router = new VueRouter({
  base: './',
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes,
});

export default router;
